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
            <SnackbarProvider maxSnack={3}>
                <ThemeRegistry>
                    {children}
                </ThemeRegistry>
            </SnackbarProvider>
        </Providers>
        </body>
        </html>
    );
}
