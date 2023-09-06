"use client";
import {
	Avatar,
	Button,
	Container,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<form>
			<Container component="main" maxWidth="xs" className={"h-screen"}>
				<Stack
					justifyContent={"center"}
					alignItems={"center"}
					alignContent={"center"}
					direction={"column"}
					spacing={2}
					className={"h-full"}
				>
					<Avatar className="m-1">
						<LockOutlined />
					</Avatar>

					<Typography component="h1" variant="h5">
						Login
					</Typography>

					<TextField
						disabled={loading}
						required
						autoFocus
						fullWidth
						id="rgm"
						name="rgm"
						label="RGM"
					/>
					<TextField
						disabled={loading}
						required
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						autoComplete="password"
					/>
					<Button
						disabled={loading}
						type="submit"
						fullWidth
						variant="contained"
						onClick={() => {
							setLoading(true);
							router.push("/activities");
						}}
					>
						Login
					</Button>
				</Stack>
			</Container>
		</form>
	);
}
