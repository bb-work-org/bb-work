"use client";
import { PropsWithChildren, useEffect } from "react";
import {
	AppBar,
	Avatar,
	Skeleton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { stringAvatar } from "@/helpers/text-to-avatar";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {
	useAuthenticatedQuery,
	useGetMeQuery,
} from "@/redux/services/user-api";
import { clearAuth } from "@/redux/features/auth-slice";
import { Navbar } from "@/components/navbar";

export default function Layout({ children }: PropsWithChildren) {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { isLoading, data } = useGetMeQuery();
	const { data: auth } = useAuthenticatedQuery();

	useEffect(() => {
		if (auth?.status === 401) {
			dispatch(clearAuth());
			router.push("/");
		}
	}, [auth?.status]);
  
	return (
		<div className="h-screen">
			<Navbar />
			{children}
		</div>
	);
}
