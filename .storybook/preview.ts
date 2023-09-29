import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import "@/app/[locale]/globals.css";
import { lightTheme } from "@/theme/schemes/light-theme";
import { darkTheme } from "@/theme/schemes/dark-theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},

	decorators: [
		withThemeFromJSXProvider({
			themes: {
				light: lightTheme,
				dark: darkTheme,
			},
			defaultTheme: "light",
			Provider: ThemeProvider,
			GlobalStyles: CssBaseline,
		}),
	],
};

export default preview;
