"use client";
import { Card, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useGetMeQuery } from "@/redux/services/user-api";
import { useGetCoursesQuery } from "@/redux/services/courses-api";
import { useEffect } from "react";

export default function Activities() {
	const { isLoading, data } = useGetMeQuery();
	const { data: courses } = useGetCoursesQuery(data?.id ?? "");

	useEffect(() => {
		console.log(courses, data)
	}, [courses, data]);

	return (
		<Stack
			justifyContent={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			spacing={2}
			className={"h-full"}
		>
			<Typography>
				Activities page
				{isLoading ? <CircularProgress/> : undefined}
			</Typography>
			<Grid container>
				{
					courses?.map((courseRoot) => (
						<Grid key={courseRoot.id} item>
							<Card>
								<Typography>
									{courseRoot.course.name}
								</Typography>
							</Card>
						</Grid>
					))
				}
			</Grid>
		</Stack>
	);
}
