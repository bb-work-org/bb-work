"use client";

import { Check, Language } from "@mui/icons-material";
import {
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { BottomModal } from "@/components/bottom-modal/bottom-modal";
import { languageFormat } from "@/helpers/language-format";
import { languages } from "@/i18n/settings";
import { setSettings } from "@/redux/features/settings-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Settings() {
  const router = useRouter();

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
