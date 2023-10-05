export const checkDefaultProfile = (url: string) => {
  return url.includes("default") ? undefined : url;
};
