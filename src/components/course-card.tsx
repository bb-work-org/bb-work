import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CourseResult } from "@/@types/courses";

export default function CourseCard({ courseRoot }: { courseRoot: CourseResult }) {
	return (
		<Grid width={"full"} height={"full"} my={1} item>
			<Card>
				<CardActionArea>
					<CardMedia
						component={"img"}
						height={140}
						// src={courseRoot.course.banner?.permanentUrl}
						alt={courseRoot.course.bannerAltText}
					/>
					<CardContent>
						<Typography>
							{courseRoot.course.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}