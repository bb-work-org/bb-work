import { fetch, ResponseType } from "@tauri-apps/api/http";
import { unknown } from "zod";
import type { Activity, ActivityResult } from "@/@types/activities";
import { getState } from "@/redux/store";
import { getApi } from "@/utils/get-api";
import { BBError } from "@/utils/handlers/bb-error";

function getBBSession() {
  const bbSession = getState().auth.bbSession;

  if (!bbSession) {
    throw new BBError("BbSession doesn't exist");
  }

  return bbSession;
}

async function getSimpleCourseContent(courseId: string, recursive = true) {
  const bbSession = getBBSession();

  const response = await fetch<ActivityResult>(getApi(`/learn/api/v1/courses/${courseId}/contents`), {
    query: {
      recursive: recursive.toString(),
    },
    headers: {
      Cookie: bbSession,
    },
    responseType: ResponseType.JSON,
    method: "GET",
  });

  if (!response.ok) {
    throw new BBError("Content request failed");
  }

  return response.data;
}

async function getComplexCourseContent(courseId: string) {
  const result = {
    permissions: unknown,
    results: [] as Activity[],
    paging: {
      count: 0,
      limit: 0,
      offset: 0,
      nextPage: "",
      previousPage: "",
    },
  } satisfies ActivityResult;

  async function getRecursiveContent(id: string) {
    let content = await getSimpleCourseContent(id).catch(() => null);

    if (!content) {
      content = await getSimpleCourseContent(id, false);
    }

    if (!content || !content.results) {
      return;
    }

    for (const item of content.results) {
      if (item.contentHandler === "resource/x-bb-folder") {
        await getRecursiveContent(item.id);
      } else {
        result.results.push(item);
      }
    }
  }

  await getRecursiveContent(courseId);
  return result;
}

export async function getCourseContent(courseId: string) {
  const result = await getSimpleCourseContent(courseId).catch(() => {
    console.log("Failed to get simple course content");
    return getComplexCourseContent(courseId);
  });

  console.log(result);

  return result;
}
