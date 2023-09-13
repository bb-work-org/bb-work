"use client";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuthenticatedQuery } from "@/redux/services/user-api";
import { clearAuth } from "@/redux/features/auth-slice";
import { Navbar } from "@/components/navbar";
import { enqueueSnackbar } from "notistack";
import { Routes } from "@/constants/routes";

export default function Layout({ children }: PropsWithChildren) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { loggedIn } = useAppSelector((state) => state.auth);

	const { data: auth } = useAuthenticatedQuery();

	useEffect(() => {
		if (!loggedIn) router.push("/");

		if (auth?.status === 401) {
			dispatch(clearAuth());
			router.push("/");

			enqueueSnackbar("Session expired", {
				variant: "warning",
			});
		}
	}, [auth?.status, loggedIn]);

	return (
		<div className="w-full h-screen">
			<Navbar routes={Routes}>{children}</Navbar>
		</div>
	);
}
