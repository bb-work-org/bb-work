import { DashboardRoute } from "@/@types/dashboard-routes";
import { PlayLesson } from "@mui/icons-material";

export const Routes: DashboardRoute[] = [
	{
		path: "/dashboard",
		name: "Activities",
		icon: <PlayLesson />,
	},
];
