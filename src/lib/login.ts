import { Body, ResponseType } from "@tauri-apps/api/http";
import { getClient } from "@/lib/httpclient";

export async function getLoginCookies() {
	const client = await getClient();

	return client
		.get("https://bb.cruzeirodosulvirtual.com.br/webapps/login/", {
			responseType: ResponseType.Text,
		})
		.then((res) => res.rawHeaders["set-cookie"])
		.catch((reason) => console.error("Failed to fetch, reason:", reason));
}

function getXsrf(cookies: string[]) {
	const cookie = cookies.find((cookie) => cookie.includes("xsrf"));
	const bbRouter = cookie?.split(";")[0];

	return bbRouter?.split(",xsrf:")[1];
}

async function loginUser(username: string, password: string, xsrf: string) {
	const client = await getClient();

	const body = Body.form({
		user_id: username,
		password,
		login: "Fazer+login",
		action: "login",
		new_loc: "",
		"blackboard.platform.security.NonceUtil.nonce.ajax": xsrf,
	});

	return client
		.post("https://bb.cruzeirodosulvirtual.com.br/webapps/login/", body, {
			responseType: ResponseType.Text,
		})
		.then((res) => {
			if (res.status !== 302) {
				console.log(res);
				throw new Error("Login failed");
			} else {
				console.log("Login successful");
				return res;
			}
		})
		.catch((reason) => console.error("Failed to fetch, reason:", reason));
}

export async function login(username: string, password: string) {
	const cookies = await getLoginCookies();
	const xsrf = cookies && getXsrf(cookies);

	if (!xsrf) {
		return;
	}

	console.log(xsrf, cookies);
	await loginUser(username, password, xsrf);
}
