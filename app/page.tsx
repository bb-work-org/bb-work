import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";

export default function Home() {
	const isLogged = false;

	if (!isLogged) {
		redirect("/login");
	}

	return (
		<main>
			<Typography>Logged in</Typography>
		</main>
	);
}
