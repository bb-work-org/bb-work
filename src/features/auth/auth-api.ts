import {Body, fetch, ResponseType} from "@tauri-apps/api/http";
import {getApi} from "@/utils/get-api";

const NONCE_VALUE = "blackboard.platform.security.NonceUtil.nonce.ajax";

export const getAuth = async () => {
    const response = await fetch<string>(getApi("/"), {
        responseType: ResponseType.Text
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");

    const loginForm = doc.getElementById("login-form");

    if (!loginForm) throw new Error("Login form not found");

    return {
        new_loc: loginForm?.querySelector<HTMLInputElement>("input[name='new_loc']")?.value,
        nonce: loginForm?.querySelector<HTMLInputElement>(`input[name='${NONCE_VALUE}']`)?.value,
        cookie: response.rawHeaders["set-cookie"].map((cookie: string) => cookie.split(";")[0])
            .join(";")
    }
}

export const signIn = async (rgm: string, password: string) => {
    const auth = await getAuth();

    const response = await fetch<string>(getApi("/webapps/login/"), {
        method: "POST",
        body: Body.form({
            user_id: rgm,
            password: password,
            action: "login",
            new_loc: auth.new_loc,
            login: encodeURI("Fazer login"),
            [NONCE_VALUE]: auth.nonce,
        }),
        headers: {
            "Cookie": auth.cookie + ";COOKIE_CONSENT_ACCEPTED=true",
        },
        responseType: ResponseType.Text
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");

    const error = doc.getElementById("loginErrorMessage");

    if (error) throw new Error(error.textContent ?? "Unknown error");

    if (response.status !== 200) throw new Error("Ocorreu um erro ao fazer login");

    return true;
}