import nextJest from "next/jest";
import { Config } from "jest";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	testEnvironment: "jest-environment-jsdom",
	modulePathIgnorePatterns: ["<rootDir>/dist/"],
	testPathIgnorePatterns: ["<rootDir>/test"],
};

export default createJestConfig(config);
