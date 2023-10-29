"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "use-intl";
import * as yup from "yup";
import { useWithLocale } from "@/hooks/useWithLocale";
import { signIn } from "@/redux/actions/auth-action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Inputs {
  rgm: string;
  password: string;
}

const schema = yup.object().shape({
  rgm: yup.string().required("RGM is required"),
  password: yup.string().required("Password is required"),
});

export default function SignForm() {
  const route = useRouter();
  const withLocale = useWithLocale();
  const locale = useLocale();

  const t = useTranslations("sign-in");

  const dispatch = useAppDispatch();
  const { loading, loggedIn } = useAppSelector((state) => state.auth);
  const settings = useAppSelector((state) => state.settings);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (settings.locale !== locale) redirect(`/${settings.locale}`);

    if (loggedIn) route.push(withLocale("/dashboard"));
  }, [locale, loggedIn, route, settings.locale, withLocale]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(signIn(data));
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        {t("title")}
      </Typography>
      <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          label="RGM"
          autoComplete="rgm"
          fullWidth
          autoFocus
          {...register("rgm")}
          error={!!errors.rgm}
          helperText={errors.rgm?.message || false}
        />
        <TextField
          variant="outlined"
          label={t("password")}
          type="password"
          autoComplete="current-password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message || false}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid || loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {t("signIn")}
        </Button>
      </form>
    </>
  );
}
