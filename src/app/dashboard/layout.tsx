"use client";
import { PropsWithChildren } from "react";
import {
	AppBar,
	Avatar,
	Skeleton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { useGetMeQuery } from "@/redux/services/user-api";
import { stringAvatar } from "@/helpers/text-to-avatar";

export default function Layout({ children }: PropsWithChildren) {
	const { isLoading, data } = useGetMeQuery();

	return (
		<div className="h-screen">
			<AppBar position="static">
				<Toolbar>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
						className="w-full"
					>
						<div></div>
						<Stack direction="row" spacing={2} alignItems="center">
							{isLoading ? (
								<Skeleton
									variant="circular"
									width={40}
									height={40}
								/>
							) : (
								<Avatar
									src={data?.avatar.permanentUrl}
									alt={data?.givenName}
									sx={{
										width: 40,
										height: 40,
									}}
									{...stringAvatar(data?.givenName ?? "")}
								/>
							)}
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}
							>
								{data?.givenName}
							</Typography>
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>
			{children}
		</div>
	);
}
