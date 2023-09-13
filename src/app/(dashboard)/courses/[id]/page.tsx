"use client";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { useGetCourseContentsQuery } from "@/redux/services/course-api";

export default function CourseActivities({ params }: { params: { id: string }} ) {
	const { data } = useGetCourseContentsQuery(params.id);

	console.log(data, params.id)

	return (
		<Stack display={"flex"} direction={"column"}>
			<Typography>
				Activities from course - {params.id}
			</Typography>

			<Grid>
				{data?.results?.map((activity) => (
					<Card key={activity.id}>{activity.title}</Card>
				))}
			</Grid>
		</Stack>
	)
}