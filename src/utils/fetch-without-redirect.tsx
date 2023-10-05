import { type Client, type FetchOptions, getClient, type Response } from "@tauri-apps/api/http";

let defaultClient: Client | null = null;

export async function fetchWithoutRedirect<T>(url: string, options?: FetchOptions): Promise<Response<T>> {
  if (defaultClient === null) {
    defaultClient = await getClient({
      maxRedirections: 0,
    });
  }
  return await defaultClient.request({
    url,
    method: options?.method ?? "GET",
    ...options,
  });
}
