import { useLocale } from "use-intl";

export const useWithLocale = () => {
  const locale = useLocale();
  return (href: string) => {
    return `/${locale}${href}`;
  };
};
