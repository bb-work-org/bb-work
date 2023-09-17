"use client";
import {CircularProgress, Grid, Stack, Typography} from "@mui/material";
import {useGetMeQuery} from "@/redux/services/user-api";
import {useGetCoursesQuery} from "@/redux/services/course-api";
import CourseCard from "@/components/course-card";

export default function Activities() {
	const { isLoading, data } = useGetMeQuery();
	const { data: courses } = useGetCoursesQuery(data?.id ?? "", { skip: data === undefined });

	console.log(courses)

	return (
		<Stack
			justifyContent={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			p={3}
			my={2}
		>
			<Typography display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
				Activities - { courses?.paging?.count ?? 0 }
				{isLoading ? <CircularProgress/> : undefined}
			</Typography>

			<Grid spacing={2} my={1} container>
				{courses?.results?.map((courseRoot) => (
					<CourseCard key={courseRoot.id} courseRoot={courseRoot} />
				))}
			</Grid>
		</Stack>
	);
}
