import { notFound } from "next/navigation";

export async function getTranslations(locale: string) {
  try {
    return (await import(`./locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}
