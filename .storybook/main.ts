import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-styling",
			options: {},
		},
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},

	//alias
	webpackFinal: async (config) => {
		if (!config.resolve) config.resolve = {};

		config.resolve.alias = {
			...config.resolve.alias,
			"@": require("path").resolve(__dirname, "../src"),
		};
		return config;
	},
};
export default config;
