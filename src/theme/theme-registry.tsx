'use client';
import * as React from 'react';
import {useMemo} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from '@/theme/emotion-cache';
import {useMediaQuery} from "@mui/material";
import {darkTheme} from "@/theme/schemes/dark-theme";
import {lightTheme} from "@/theme/schemes/light-theme";

export default function ThemeRegistry({children}: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => {
        return prefersDarkMode ? darkTheme : lightTheme;
    }, [prefersDarkMode]);

    return (
        <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}