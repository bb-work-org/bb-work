"use client";
import { AccountCircle, ArrowBack, Logout, Menu as MenuIcon, Settings } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { type DashboardRoute } from "@/@types/dashboard-routes";
import { checkDefaultProfile } from "@/helpers/check-default-profile";
import { formatName } from "@/helpers/format-name";
import { stringAvatar } from "@/helpers/text-to-avatar";
import { useWithLocale } from "@/hooks/useWithLocale";
import { signOut } from "@/redux/actions/auth-action";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/services/user-api";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  routes: DashboardRoute[];
}

export const Navbar: FC<PropsWithChildren<Props>> = ({ children, window, routes }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("profile");
  const t2 = useTranslations("dashboard");
  const withLocale = useWithLocale();

  const { isLoading, data } = useGetMeQuery();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    setShowBackButton(!routes.map((route) => withLocale(route.path) === pathname).includes(true));
  }, [pathname, routes, withLocale]);

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          BB Work
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {routes.map((route) => {
          return (
            <ListItem component={Link} key={route.name} href={withLocale(route.path)} disablePadding>
              <ListItemButton selected={pathname === withLocale(route.path)}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={t2(route.name as never)} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenu(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="w-full">
            {!showBackButton ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: "none", sm: "flex" } }} />
              </>
            ) : (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
            )}

            <Stack direction="row" spacing={2} alignItems="center">
              {isLoading ? (
                <>
                  <Skeleton variant="circular" width={40} height={40} />
                </>
              ) : (
                <ButtonBase
                  sx={{
                    borderRadius: "40px",
                  }}
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar
                    src={checkDefaultProfile(data?.avatar?.permanentUrl ?? "")}
                    alt={formatName(data?.givenName ?? "Unknown")}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                    {...stringAvatar(formatName(data?.givenName ?? "Unknown"))}
                  />
                </ButtonBase>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          height: "100%",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={profileMenu}
        open={Boolean(profileMenu)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem component={Link} href={withLocale("/profile")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={`${formatName(data?.givenName ?? "Unknown")}`} />
        </MenuItem>
        <Divider />
        <MenuItem component={Link} href={withLocale("/dashboard/settings")}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={t("settings")} />
        </MenuItem>
        <MenuItem onClick={async () => await dispatch(signOut())}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={t("signOut")} />
        </MenuItem>
      </Menu>
    </>
  );
};
