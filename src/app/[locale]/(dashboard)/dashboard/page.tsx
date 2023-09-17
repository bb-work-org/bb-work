"use client";
import {Grid, Stack} from "@mui/material";
import {useGetMeQuery} from "@/redux/services/user-api";
import {useGetCoursesQuery} from "@/redux/services/course-api";
import {CourseCard} from "@/components/course-card";

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
		>
			<Grid spacing={2} my={1} container>
				{isLoading
					? (
						new Array(8).fill(null).map((index) => (
							<CourseCard.Skeleton key={index} />
						))
					)
					: (
						courses?.results?.map((courseRoot) => (
							<CourseCard.Root key={courseRoot.id} courseRoot={courseRoot} />
						))
					)
				}
			</Grid>
		</Stack>
	);
}
