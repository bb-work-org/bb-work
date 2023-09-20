import {DashboardRoute} from "@/@types/dashboard-routes";
import {PlayLesson} from "@mui/icons-material";

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
