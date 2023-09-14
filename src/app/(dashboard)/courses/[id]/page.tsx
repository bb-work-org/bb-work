"use client";
import { List, Stack, Typography } from "@mui/material";
import { useGetCourseContentsQuery } from "@/redux/services/course-api";
import ActivityCard from "@/components/activity-card";

export default function CourseActivities({ params }: { params: { id: string }} ) {
	const { data } = useGetCourseContentsQuery(params.id);

	console.log(data, params.id)

	return (
		<Stack display={"flex"} direction={"column"}>
			<Typography>
				Activities from course - {params.id}
			</Typography>

			<List>
				{data?.results?.map((activity) => {
					if (activity.contentHandler !== "resource/x-bb-assignment") {
						return;
					}

					return <ActivityCard key={activity.id} activity={activity} />
				})}
			</List>
		</Stack>
	)
}