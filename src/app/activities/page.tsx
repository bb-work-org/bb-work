import { Container, Stack, Typography } from "@mui/material";

export default function Activities() {
	return (
		<Container component="main" maxWidth="xs" className={"h-screen"}>
			<Stack
				justifyContent={"center"}
				alignItems={"center"}
				alignContent={"center"}
				direction={"column"}
				spacing={2}
				className={"h-full"}
			>
				<Typography>Activities page</Typography>
			</Stack>
		</Container>
	);
}
