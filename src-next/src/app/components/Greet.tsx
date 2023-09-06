"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";

export default function Greet() {
	const [greetings, setGreetings] = useState("");

	useEffect(() => {
		invoke<string>("test", { name: "speed" })
			.then(setGreetings)
			.catch(console.error);
	}, []);

	return <>{greetings}</>;
}
