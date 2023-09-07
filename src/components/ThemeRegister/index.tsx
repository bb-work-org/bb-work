import { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import NextAppDirEmotionCacheProvider from "@/components/ThemeRegister/EmotionCache";

export default function ThemeRegister({ children }: PropsWithChildren) {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
