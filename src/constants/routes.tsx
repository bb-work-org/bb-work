import { PlayLesson } from "@mui/icons-material";
import { type DashboardRoute } from "@/@types/dashboard-routes";

export const Routes: DashboardRoute[] = [
  {
    path: "/dashboard",
    name: "navigation.dashBoard",
    icon: <PlayLesson />,
  },
  {
    path: "/activities",
    name: "navigation.activities",
    icon: <PlayLesson />,
  },
];
