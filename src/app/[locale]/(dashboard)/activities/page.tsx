"use client";
import { List } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActivityCard } from "@/components/activity-card";
import { getActivities } from "@/redux/actions/activities-action";
import { clearActivities } from "@/redux/features/activities-slice";
import { useAppSelector } from "@/redux/hooks";
import { useGetCoursesQuery } from "@/redux/services/course-api";
import { useGetMeQuery } from "@/redux/services/user-api";
import { type AppDispatch } from "@/redux/store";

export default function Activities() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: me } = useGetMeQuery();
  const { data: courses } = useGetCoursesQuery(me?.id ?? skipToken);
  const { activities, loading: activitiesLoading } = useAppSelector((state) => state.activities);

  useEffect(() => {
    if (!courses) {
      return;
    }

    dispatch(clearActivities());

    courses.results.forEach(async ({ courseId }) => await dispatch(getActivities(courseId)));
  }, [courses, dispatch]);

  return (
    <List sx={{ p: 3 }}>
      {activitiesLoading
        ? new Array(10).fill(null).map((_, index) => <ActivityCard.Skeleton key={index} />)
        : activities?.map((activity, index) => <ActivityCard.Root key={index} activity={activity} />)}
    </List>
  );
}
