"use client";
import { Link, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { type ActivityWithChildren } from "@/@types/activities";
import { ActivityCard } from "@/components/activity-card";
import CourseContent from "@/components/course-content/course-content";
import { useContentQuery } from "@/redux/services/course-content-api";

export default function CourseActivities({ params: { id } }: { params: { id: string } }) {
  const { data, refetch } = useContentQuery({ courseId: id, query: { recursive: "true" } });
  const [contents, setContents] = useState<ActivityWithChildren[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!data?.results) {
      console.warn("Failed to load course activities: ", data);
      return setError("Failed to load course activities");
    }

    window.scroll({ top: 0, behavior: "smooth" });
    setError("");

    const courseContents = [];
    const results: ActivityWithChildren[] = data.results; // .filter((content) => content.contentHandler !== "resource/x-bb-assignment");

    const getChildren = (parentId: string) => {
      const children: ActivityWithChildren[] = [];

      for (const content of results) {
        if (content.parentId === parentId) {
          const contentChildren = getChildren(content.id);

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

    setContents(courseContents);
  }, [data]);

  return (
    <List sx={{ p: 3 }}>
      {(() => {
        switch (true) {
          case !contents:
            return new Array(7).fill(null).map((_, index) => <ActivityCard.Skeleton key={index} />);
          case contents && contents.length > 0:
            return contents?.map((content, index) => <CourseContent activity={content} key={index} />);
          default:
            return (
              <Typography display={"flex"} flexDirection={"row"} gap={0.6} justifyContent={"center"}>
                {error !== "" ? error : "No content found"},
                <Link component={"button"} variant={"body2"} underline={"always"} onClick={async () => await refetch()}>
                  retry
                </Link>
              </Typography>
            );
        }
      })()}
    </List>
  );
}
