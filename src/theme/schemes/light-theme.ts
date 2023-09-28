import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: "#e0e0e0 #f0f0f0",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						width: 12,
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb":
						{
							borderRadius: 8,
							backgroundColor: "#b0b0b0",
							minHeight: 24,
							border: "3px solid #fff",
						},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
						{
							backgroundColor: "#808080",
						},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
						{
							backgroundColor: "#808080",
						},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
						{
							backgroundColor: "#808080",
						},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":
						{
							backgroundColor: "#d0d0d0",
						},
				},
			},
		},
	},
});
