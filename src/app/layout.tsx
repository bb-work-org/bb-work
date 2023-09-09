"use client";
import "./globals.css";
import React, {PropsWithChildren} from "react";
import ThemeRegistry from "@/theme/theme-registry";
import {Providers} from "@/redux/provider";
import {SnackbarProvider} from "notistack";

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <ThemeRegistry>
                <SnackbarProvider maxSnack={3}>
                    {children}
                </SnackbarProvider>
            </ThemeRegistry>
        </Providers>
        </body>
        </html>
    );
}
