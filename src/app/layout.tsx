"use client";
import "./globals.css";
import React from "react";
import ThemeRegistry from "@/theme/theme-registry";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					{children}
				</ThemeRegistry>
			</body>
		</html>
	);
}
