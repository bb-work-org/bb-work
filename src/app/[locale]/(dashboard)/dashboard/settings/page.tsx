"use client";

import { Check, Language, LightMode } from "@mui/icons-material";
import {
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { Theme } from "@/@types/theme";
import { BottomModal } from "@/components/bottom-modal/bottom-modal";
import { languageFormat } from "@/helpers/language-format";
import { useTheme } from "@/hooks/useTheme";
import { languages } from "@/i18n/settings";
import { setSettings } from "@/redux/features/settings-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Settings() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const dispatch = useAppDispatch();
  const { locale } = useAppSelector((state) => state.settings);

  const t = useTranslations("settings");

  const [selectLanguage, setSelectLanguage] = useState(false);

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setSelectLanguage(true);
            }}
          >
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary={t("language")} />
            <ListItemSecondaryAction>
              <Typography variant="body2">{languageFormat(locale)}</Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          <ListItemText primary={t("theme.title")} />
          <ListItemSecondaryAction>
            <Select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
              <MenuItem value="system">{t("theme.system")}</MenuItem>
              <MenuItem value="light">{t("theme.light")}</MenuItem>
              <MenuItem value="dark">{t("theme.dark")}</MenuItem>
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <BottomModal
        open={selectLanguage}
        onClose={() => {
          setSelectLanguage(false);
        }}
      >
        <DialogTitle>{t("modals.language.title")}</DialogTitle>
        <DialogBody>
          <List>
            {languages.map((language) => (
              <ListItem key={language} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(`/${language}/dashboard/settings`);
                    dispatch(
                      setSettings({
                        locale: language,
                      })
                    );
                    setSelectLanguage(false);
                  }}
                >
                  <ListItemText primary={languageFormat(language)} sx={{ pl: 2 }} />
                  <ListItemSecondaryAction sx={{ pr: 2 }}>{locale === language && <Check />}</ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogBody>
      </BottomModal>
    </>
  );
}
