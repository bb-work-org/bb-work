"use client";
import { Link, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { type ActivityWithChildren } from "@/@types/activities";
import { ActivityCard } from "@/components/activity-card";
import CourseContent from "@/components/course-content/course-content";
import { useGetCourseContentsQuery } from "@/redux/services/course-api";

export default function CourseActivities({ params }: { params: { id: string } }) {
  const { data, refetch } = useGetCourseContentsQuery(params.id);
  const [contents, setContents] = useState<ActivityWithChildren[]>();

  console.log(data, params.id);

  useEffect(() => {
    if (!data?.results) {
      return;
    }

    const courseContents = [];
    const results: ActivityWithChildren[] = data.results; // .filter((content) => content.contentHandler !== "resource/x-bb-assignment");

    const getChildren = (parentId: string) => {
      const children: ActivityWithChildren[] = [];

      for (const content of results) {
        if (content.parentId === parentId) {
          const contentChildren = getChildren(content.id);

          console.log(contentChildren.length, contentChildren);
          children.push({
            ...content,
            children: contentChildren,
          });
        }
      }

      return children;
    };

    for (const content of results) {
      if (content.parentId === undefined) {
        const children = getChildren(content.id);

        if (children.length > 0) {
          courseContents.push({ ...content, children });
        }
      }
    }

    console.log(courseContents);
    setContents(courseContents);
  }, [data?.results]);

  return (
    <List sx={{ p: 3 }}>
      {!contents ? (
        new Array(7).fill(null).map((_, index) => <ActivityCard.Skeleton key={index} />)
      ) : contents.length > 0 ? (
        contents.map((content, index) => <CourseContent activity={content} key={index} />) // todo: add support to i18n
      ) : (
        <Typography display={"flex"} flexDirection={"row"} gap={0.6} justifyContent={"center"}>
          No content found,
          <Link component={"button"} variant={"body2"} underline={"always"} onClick={async () => await refetch()}>
            retry
          </Link>
        </Typography>
      )}
    </List>
  );
}
