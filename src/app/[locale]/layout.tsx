import "./globals.css";
import React, { PropsWithChildren } from "react";
import ThemeRegistry from "@/theme/theme-registry";
import { Providers } from "@/redux/provider";
import { languages } from "@/i18n/settings";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "@/i18n/i18n";

export async function generateStaticParams() {
	return languages.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
	const localeMessages = await getTranslations(locale);

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider
					locale={locale}
					messages={localeMessages}
				>
					<Providers>
						<ThemeRegistry>{children}</ThemeRegistry>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
