import { Body, fetch, ResponseType } from "@tauri-apps/api/http";
import { fetchWithoutRedirect } from "@/utils/fetch-without-redirect";
import { getApi } from "@/utils/get-api";
import { BBError } from "@/utils/handlers/bb-error";

const NONCE_VALUE = "blackboard.platform.security.NonceUtil.nonce.ajax";

export const getAuth = async () => {
  const response = await fetch<string>(getApi("/"), {
    method: "GET",
    responseType: ResponseType.Text,
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data, "text/html");

  const loginForm = doc.getElementById("login-form");

  if (!loginForm) throw new BBError("Login form not found");

  return {
    new_loc: loginForm?.querySelector<HTMLInputElement>("input[name='new_loc']")?.value,
    nonce: loginForm?.querySelector<HTMLInputElement>(`input[name='${NONCE_VALUE}']`)?.value,
    cookies: response.rawHeaders["set-cookie"].map((cookie: string) => cookie.split(";")[0]),
  };
};

export const signIn = async (rgm: string, password: string) => {
  const auth = await getAuth();

  const response = await fetchWithoutRedirect<string>(getApi("/webapps/login/"), {
    method: "POST",
    body: Body.form({
      user_id: rgm,
      password,
      action: "login",
      new_loc: auth.new_loc ?? "",
      login: encodeURI("Fazer login"),
      [NONCE_VALUE]: auth.nonce ?? "",
    }),
    headers: {
      Cookie: `${auth.cookies.join("; ")};COOKIE_CONSENT_ACCEPTED=true`,
    },
    responseType: ResponseType.Text,
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data, "text/html");

  const error = doc.getElementById("loginErrorMessage");

  if (error) throw new BBError(error.textContent ?? "Unknown error");

  if (response.status !== 302) {
    throw new BBError("Ocorreu um erro ao fazer login");
  }

  const bbSession = response.rawHeaders["set-cookie"].map((cookie: string) => cookie.split(";")[0]).join("; ");

  return {
    bbSession,
    xsrfToken: bbSession.split(",xsrf:")[1],
  };
};
