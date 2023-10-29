"use client";
import { Grid, Stack } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { CourseCard } from "@/components/course-card";
import { useCoursesQuery } from "@/redux/services/course-api";
import { useGetMeQuery } from "@/redux/services/user-api";

export default function Activities() {
  const { data } = useGetMeQuery();
  const { isLoading, data: courses } = useCoursesQuery(data?.id ?? skipToken);

  console.log(courses);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} alignContent={"center"} direction={"column"} p={3}>
      <Grid spacing={2} my={1} container>
        {isLoading
          ? new Array(8).fill(null).map((_, index) => <CourseCard.Skeleton key={index} />)
          : courses?.results?.map((courseRoot) => <CourseCard.Root key={courseRoot.id} courseRoot={courseRoot} />)}
      </Grid>
    </Stack>
  );
}
