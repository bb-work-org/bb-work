import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import React, { type PropsWithChildren } from "react";
import { getTranslations } from "@/i18n/i18n";
import { languages } from "@/i18n/settings";
import { Providers } from "@/redux/provider";
import ThemeRegistry from "@/theme/theme-registry";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  const localeMessages = await getTranslations(locale);
  const timeZone = "America/Sao_Paulo";

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider timeZone={timeZone} locale={locale} messages={localeMessages}>
          <Providers>
            <ThemeRegistry>{children}</ThemeRegistry>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
