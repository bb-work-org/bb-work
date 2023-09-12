"use client";
import { Stack, Typography } from "@mui/material";
import { useGetMeQuery } from "@/redux/services/user-api";

export default function Activities() {
	const { isLoading, data } = useGetMeQuery();

	return (
		<Stack
			justifyContent={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			spacing={2}
			className={"h-full"}
		>
			<Typography>Activities page</Typography>
			<Typography></Typography>
		</Stack>
	);
}
