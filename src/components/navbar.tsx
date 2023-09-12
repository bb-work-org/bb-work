"use client";
import {
	AppBar,
	Avatar,
	ButtonBase,
	Divider,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Skeleton,
	Stack,
	Toolbar,
} from "@mui/material";
import { stringAvatar } from "@/helpers/text-to-avatar";
import { useGetMeQuery } from "@/redux/services/user-api";
import React, { useState } from "react";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";

export const Navbar = () => {
	const { isLoading, data } = useGetMeQuery();

	const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setProfileMenu(event.currentTarget);
	};

	const handleProfileMenuClose = () => {
		setProfileMenu(null);
	};

	return (
		<>
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
								<>
									<Skeleton
										variant="circular"
										width={40}
										height={40}
									/>
								</>
							) : (
								<ButtonBase
									sx={{
										borderRadius: "40px",
									}}
									onClick={handleProfileMenuOpen}
								>
									<Avatar
										//src={data?.avatar.permanentUrl}
										alt={data?.givenName}
										sx={{
											width: 40,
											height: 40,
										}}
										{...stringAvatar(data?.givenName ?? "")}
									/>
								</ButtonBase>
							)}
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>

			<Menu
				anchorEl={profileMenu}
				open={Boolean(profileMenu)}
				onClose={handleProfileMenuClose}
				onClick={handleProfileMenuClose}
			>
				<MenuItem>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText
						primary={`${data?.givenName
							.split(" ")
							.slice(0, 2)
							.join(" ")}`}
					/>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<Settings />
					</ListItemIcon>
					<ListItemText primary="Configurações" />
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Logout />
					</ListItemIcon>
					<ListItemText primary="Sair" />
				</MenuItem>
			</Menu>
		</>
	);
};
