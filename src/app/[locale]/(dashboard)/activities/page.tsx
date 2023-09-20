"use client";
import {List} from "@mui/material";
import {useGetMeQuery} from "@/redux/services/user-api";
import {useGetCoursesQuery} from "@/redux/services/course-api";
import {ActivityCard} from "@/components/activity-card";
import {skipToken} from "@reduxjs/toolkit/dist/query/react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getActivities} from "@/redux/actions/activities-action";
import {AppDispatch} from "@/redux/store";
import {useAppSelector} from "@/redux/hooks";
import {clearActivities} from "@/redux/features/activities-slice";

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

        courses.results.forEach(({ courseId }) => 
            dispatch(getActivities(courseId))
        );
    }, [courses, dispatch])

    return (
        <List sx={{ p: 3 }}>
            {activitiesLoading
                ? new Array(10).fill(null).map((_, index) => <ActivityCard.Skeleton key={index}/>)
                : (
                    activities?.map((activity, index) => (
                        <ActivityCard.Root key={index} activity={activity}/>
                    ))
                )
            }
        </List>
    )
}