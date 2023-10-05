"use client";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { type PropsWithChildren, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Routes } from "@/constants/routes";
import { useWithLocale } from "@/hooks/useWithLocale";
import { clearAuth } from "@/redux/features/auth-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuthenticatedQuery } from "@/redux/services/user-api";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const withLocale = useWithLocale();
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);

  const { data: auth } = useAuthenticatedQuery();

  useEffect(() => {
    if (!loggedIn) router.push(withLocale("/"));

    if (auth?.status === 401) {
      dispatch(clearAuth());
      router.push(withLocale("/"));

      enqueueSnackbar("Session expired", {
        variant: "warning",
      });
    }
  }, [auth?.status, loggedIn]);

  return (
    <div className="h-screen w-full">
      <Navbar routes={Routes}>{children}</Navbar>
    </div>
  );
}
