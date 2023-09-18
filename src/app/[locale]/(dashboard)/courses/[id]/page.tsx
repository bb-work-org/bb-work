"use client";
import {List} from "@mui/material";
import {useGetCourseContentsQuery} from "@/redux/services/course-api";
import {ActivityCard} from "@/components/activity-card";

export default function CourseActivities({ params }: { params: { id: string }} ) {
    const { isLoading, data } = useGetCourseContentsQuery(params.id);

    console.log(data, params.id)

    return (
        <List sx={{ p: 3 }}>
            {isLoading
                ? (
                    new Array(7)
                        .fill(null)
                        .map((_, index) => <ActivityCard.Skeleton key={index} />)
                )
                : (
                    data?.results?.map((activity) => {
                        if (activity.contentHandler !== "resource/x-bb-assignment") {
                            return;
                        }

                        return <ActivityCard.Root key={activity.id} activity={activity} />
                    })
                )
            }
        </List>
    )
}