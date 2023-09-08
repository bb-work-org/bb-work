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
import { FormEvent, useState } from "react";
import { login } from "@/lib/login";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (username === "" || password === "") {
			return;
		}

		setLoading(true);

		login(username, password)
			.catch(() => {
				console.error("Failed to login");
			})
			.finally(() => setLoading(false));
	}

	return (
		<form onSubmit={(event) => handleLogin(event)}>
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
						value={username}
						onChange={(event) => setUsername(event.target.value)}
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
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button
						disabled={loading}
						type="submit"
						fullWidth
						variant="contained"
					>
						Login
					</Button>
				</Stack>
			</Container>
		</form>
	);
}
