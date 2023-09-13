import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CourseResult } from "@/@types/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseCard({ courseRoot }: { courseRoot: CourseResult }) {
	const router = useRouter();
	const [expired, setExpired] = useState(false);

	function handleClick() {
		router.push(`/courses/${courseRoot.courseId}`);
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
								src={"https://static.tuasaude.com/media/article/mo/fu/beneficios-do-abacate_13382_l.webp"}
								alt={""}
								layout={"fill"}
								objectFit={"cover"}
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