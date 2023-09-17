import {ButtonBase, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {CourseResult} from "@/@types/courses";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useGetCourseBannerQuery, useGetCourseStaticBannerQuery} from "@/redux/services/banner-api";
import {useWithLocale} from "@/hooks/useWithLocale";

export default function CourseCard({ courseRoot }: { courseRoot: CourseResult }) {
	const router = useRouter();
	const withLocale = useWithLocale();
	const [expired, setExpired] = useState(false);
	const { data: bannerUrl } = courseRoot.course.banner
		? useGetCourseBannerQuery(courseRoot.courseId)
		: useGetCourseStaticBannerQuery(`nature${courseRoot.courseCardColorIndex % 20 + 1}_thumb`);

	function handleClick() {
		router.push(withLocale(`/courses/${courseRoot.courseId}`));
	}

	useEffect(() => {
		const endDate = courseRoot.course.term?.endDate;

		if (!endDate) {
			return;
		}

		const endDateParsed = Date.parse(endDate);
		const now = Date.now();

		setExpired(endDateParsed < now);
	}, [courseRoot.course.term?.endDate]);

	return (
		<Grid sx={{ opacity: expired ? 0.5 : 1 }} xs={12} sm={12} md={6} lg={3} item>
			<ButtonBase disabled={expired} onClick={() => handleClick()} sx={{ width: "100%", height: "100%" }}>
				<Card sx={{ width: "100%", height: "100%" }}>
					<CardMedia sx={{ height: "7rem" }}>
						<div style={{ position: 'relative', width: '100%', height: '100%' }}>
							<Image
								src={ bannerUrl ?? "" }
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
								alt={courseRoot.course.bannerAltText ?? "Banner"}
								width={0}
								height={0}
							/>
						</div>
					</CardMedia>

					<CardContent sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start"
					}}>
						<Typography textAlign={"left"} sx={{ fontSize: 11 }} color={"text.secondary"} gutterBottom>
							{courseRoot.courseId}
						</Typography>

						<Typography textAlign={"left"} sx={{ fontSize: 15 }}>
							{courseRoot.course.name}
						</Typography>

						<Typography textAlign={"left"} sx={{ fontSize: 12 }} color={"text.secondary"}>
							{courseRoot.course.description}
						</Typography>
					</CardContent>
				</Card>
			</ButtonBase>
		</Grid>
	)
}