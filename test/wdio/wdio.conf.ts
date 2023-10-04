import os from "os";
import path from "path";
import { spawn, spawnSync } from "child_process";
import type { Capabilities } from "@wdio/types";

let tauriDriver: ReturnType<typeof spawn>;

const binary = process.platform === "win32" ? "bb-work.exe" : "bb-work";

export const config: WebdriverIO.Config = {
	specs: ["./specs/**/*.ts"],
	maxInstances: 1,
	capabilities: [
		{
			maxInstances: 1,
			"tauri:options": {
				application: `../../target/release/${binary}`,
			},

			"ms:edgeOptions": {},
		} as Capabilities.Capabilities,
	],
	reporters: ["spec"],
	framework: "mocha",
	mochaOpts: {
		ui: "bdd",
		timeout: 60000,
	},

	logLevel: "warn",

	// ensure the rust project is built since we expect this binary to exist for the webdriver sessions
	onPrepare: () =>
		spawnSync(["cd ../../", "yarn tauri build"].join(" && "), {
			stdio: [null, process.stdout, process.stderr],
		}),

	// ensure we are running `tauri-driver` before the session starts so that we can proxy the webdriver requests
	beforeSession: () =>
		(tauriDriver = spawn(
			path.resolve(os.homedir(), ".cargo", "bin", "tauri-driver"),
			[],
			{ stdio: [null, process.stdout, process.stderr] },
		)),

	// clean up the `tauri-driver` process we spawned at the start of the session
	afterSession: () => tauriDriver.kill(),
};
