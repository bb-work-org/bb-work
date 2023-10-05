import { languagesNames } from "@/constants/languages-names";

export const languageFormat = (language: keyof typeof languagesNames) => {
  return languagesNames[language] || language;
};
