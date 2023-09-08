"use client";
import "./globals.css";
import React, {PropsWithChildren} from "react";
import ThemeRegistry from "@/theme/theme-registry";
import {Providers} from "@/redux/provider";

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
        </Providers>
        </body>
        </html>
    );
}
