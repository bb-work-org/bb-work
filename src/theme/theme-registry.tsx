"use client";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import NextAppDirEmotionCacheProvider from "@/theme/emotion-cache";
import { darkTheme } from "@/theme/schemes/dark-theme";
import { lightTheme } from "@/theme/schemes/light-theme";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme: currentTheme } = useTheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return currentTheme === "system"
      ? prefersDarkMode
        ? darkTheme
        : lightTheme
      : currentTheme === "dark"
      ? darkTheme
      : lightTheme;
  }, [currentTheme, prefersDarkMode]);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
