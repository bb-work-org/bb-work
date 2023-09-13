import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CourseResult } from "@/@types/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CourseCard({ courseRoot }: { courseRoot: CourseResult }) {
	const router = useRouter();

	function handleClick() {
		router.push(`/activities/${courseRoot.id}`);
	}

	return (
		<Grid xs={12} sm={12} md={6} lg={3} item>
			<ButtonBase onClick={() => handleClick()} sx={{ width: "100%", height: "100%" }}>
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
							{courseRoot.id}
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