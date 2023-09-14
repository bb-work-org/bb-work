"use client";
import { List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useGetCourseContentsQuery } from "@/redux/services/course-api";

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

					return (
						<ListItem key={activity.id} disablePadding>
							<ListItemButton>
								<ListItemText primary={`${activity.title} - ${activity.id}`} />
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</Stack>
	)
}