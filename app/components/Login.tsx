import {
	Avatar,
	Button,
	Container,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

export default function Login() {
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
						required
						autoFocus
						fullWidth
						id="rgm"
						name="rgm"
						label="RGM"
					/>
					<TextField
						required
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						autoComplete="password"
					/>
					<Button type="submit" fullWidth variant="contained">
						Login
					</Button>
				</Stack>
			</Container>
		</form>
	);
}
