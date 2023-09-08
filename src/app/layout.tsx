"use client";
import "./globals.css";
import ThemeRegister from "@/components/ThemeRegister";
import React from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegister>{children}</ThemeRegister>
			</body>
		</html>
	);
}
