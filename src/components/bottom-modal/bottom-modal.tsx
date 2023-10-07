"use client";
import { Dialog, styled } from "@mui/material";

export const BottomModal = styled(Dialog)(() => ({
  "& .MuiDialog-container": {
    alignItems: "flex-end",
  },
  "& .MuiPaper-root": {
    margin: 0,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "1rem 1rem 0 0",
  },
}));
