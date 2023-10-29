import type { Preview, StoryContext } from "@storybook/react";
import "@/app/[locale]/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/theme/schemes/light-theme";
import { darkTheme } from "@/theme/schemes/dark-theme";
import { ComponentType, useMemo } from "react";
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
};

const THEMES: Record<string, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const withMuiTheme = (Story: ComponentType, context: StoryContext) => {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = useMemo(() => THEMES[themeKey] || THEMES["light"], [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
};

export const decorators = [withMuiTheme];
export default preview;
