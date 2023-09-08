import { Client, getClient as GetClient } from "@tauri-apps/api/http";

let client: Client | undefined;

export async function getClient() {
	if (!client) {
		client = await GetClient();
	}

	return client;
}
