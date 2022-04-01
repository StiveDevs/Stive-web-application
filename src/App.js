import { Box } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./components/home/Home";
import SignIn from "./components/sign-in/SignIn";
import TopBar from "./components/top-bar/TopBar";

const primaryClr = "#00FFFF";
const secondaryClr = "#008888";
const blackClr = "#000000";
const darkClr = "#002222";
const whiteClr = "#dddddd";
const greyClr = "#aaaaaa";

const mdTheme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: primaryClr,
			contrastText: blackClr,
		},
		secondary: {
			main: secondaryClr,
			contrastText: blackClr,
		},
		background: {
			default: blackClr,
			paper: darkClr,
		},
		text: {
			primary: whiteClr,
			secondary: greyClr,
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: darkClr,
					color: greyClr,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: greyClr,
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					color: blackClr,
					backgroundColor: primaryClr,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: whiteClr,
				},
			},
		},
	},
});

export const UserContext = createContext();

function App() {
	const [tab, setTab] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user = sessionStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	}, []);

	return (
		<UserContext.Provider
			value={{ user, setUser, apiUrl: "https://stive-api.herokuapp.com" }}
		>
			<ThemeProvider theme={mdTheme}>
				<Box
					sx={{
						backgroundColor: "background.default",
						minHeight: "100vh",
					}}
				>
					{!user && <SignIn />}
					<TopBar tab={tab} setTab={setTab} />
					{tab === "home" && <Home />}
				</Box>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
