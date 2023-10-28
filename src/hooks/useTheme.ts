"use client";
import { Theme } from "@/@types/theme";
import { setTheme } from "@/redux/features/theme-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTheme = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return {
    theme,
    setTheme: (theme: Theme) => dispatch(setTheme(theme)),
  };
};
