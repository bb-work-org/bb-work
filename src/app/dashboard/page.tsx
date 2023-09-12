"use client";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useGetMeQuery } from "@/redux/services/user-api";
import { useGetCoursesQuery } from "@/redux/services/courses-api";
import CourseCard from "@/components/course-card";

export default function Activities() {
	const { isLoading, data } = useGetMeQuery();
	const { data: courses } = useGetCoursesQuery(data?.id ?? "", { skip: data === undefined });

	return (
		<Stack
			justifyContent={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			my={2}
		>
			<Typography>
				Activities page
				{isLoading ? <CircularProgress/> : undefined}
			</Typography>
			<Grid direction={"column"} px={2} maxWidth={"md"} container>
				{
					courses?.results?.map((courseRoot) => (
						<CourseCard key={courseRoot.id} courseRoot={courseRoot} />
					))
				}
			</Grid>
		</Stack>
	);
}
