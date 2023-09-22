import {
	ButtonBase,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Skeleton as MuiSkeleton,
	Typography,
} from "@mui/material";
import { CourseResult } from "@/@types/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
	PropsWithChildren,
	ReactNode,
	useEffect,
	useState,
} from "react";
import {
	useGetCourseBannerQuery,
	useGetCourseStaticBannerQuery,
} from "@/redux/services/banner-api";
import { useWithLocale } from "@/hooks/useWithLocale";

function ImageSkeleton() {
	return <MuiSkeleton variant={"rectangular"} height={"100%"} />;
}

function Skeleton() {
	return (
		<Body
			clickable={false}
			handleClick={() => {}}
			image={<ImageSkeleton />}
		>
			<MuiSkeleton variant={"text"} width={"25%"} />
			<MuiSkeleton variant={"text"} width={"45%"} />
			<MuiSkeleton variant={"text"} width={"30%"} />
		</Body>
	);
}

function Root({ courseRoot }: { courseRoot: CourseResult }) {
	const router = useRouter();
	const withLocale = useWithLocale();
	const [expired, setExpired] = useState(false);

	const bannerQuery = useGetCourseBannerQuery(courseRoot.courseId);
	const staticBannerQuery = useGetCourseStaticBannerQuery(
		`nature${(courseRoot.courseCardColorIndex % 20) + 1}_thumb`,
	);

	const { isLoading, data: bannerUrl } = courseRoot.course.banner
		? bannerQuery
		: staticBannerQuery;

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

	return isLoading ? (
		<Skeleton />
	) : (
		<Body
			expired={expired}
			handleClick={handleClick}
			image={
				bannerUrl ? (
					<Image
						src={bannerUrl}
						alt={courseRoot.course.name}
						className="object-cover"
						fill
					/>
				) : (
					<ImageSkeleton />
				)
			}
		>
			<Typography
				textAlign={"left"}
				sx={{ fontSize: 11 }}
				color={"text.secondary"}
				gutterBottom
			>
				{courseRoot.courseId}
			</Typography>

			<Typography textAlign={"left"} sx={{ fontSize: 15 }}>
				{courseRoot.course.name}
			</Typography>

			<Typography
				textAlign={"left"}
				sx={{ fontSize: 12 }}
				color={"text.secondary"}
			>
				{courseRoot.course.description}
			</Typography>
		</Body>
	);
}

function Body({
	expired,
	handleClick,
	image,
	clickable,
	children,
}: PropsWithChildren<{
	expired?: boolean;
	handleClick: () => void;
	image: ReactNode;
	clickable?: boolean;
}>) {
	const isDisabled = clickable === false || expired;

	return (
		<Grid
			sx={{ opacity: isDisabled ? 0.5 : 1 }}
			xs={12}
			sm={12}
			md={6}
			lg={3}
			item
		>
			<ButtonBase
				disabled={isDisabled}
				onClick={() => handleClick()}
				sx={{ width: "100%", height: "100%" }}
			>
				<Card sx={{ width: "100%", height: "100%" }}>
					<CardMedia sx={{ height: "7rem" }}>
						<div
							style={{
								position: "relative",
								width: "100%",
								height: "100%",
							}}
						>
							{image}
						</div>
					</CardMedia>

					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						{children}
					</CardContent>
				</Card>
			</ButtonBase>
		</Grid>
	);
}

export const CourseCard = {
	Root,
	Skeleton,
};
