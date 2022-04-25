import React from 'react';
import { Alert, Box, Snackbar, Paper } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./components/home/Home";
import SignIn from "./components/sign-in/SignIn";
import TopBar from "./components/top-bar/TopBar";
import Clubs from "./components/clubs/Clubs";
import BackgroundImage from '../src/backgroundImage.jpg';
import StickyFooter from './components/sticky-footer/StickyFooter'


const primaryClr = "#00FFFF";
const secondaryClr = "#008888";
const blackClr = "#000000";
const darkClr = "#000711";
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
			default: darkClr,
			paper: darkClr,
		},
		text: {
			primary: whiteClr,
			secondary: greyClr,
		},
	},
	components: {
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
	},
});
const styles = {
	paperContainer: {
		backgroundImage: `url(${BackgroundImage})`
	}
};

export const UserContext = createContext();

function App() {
	const [tab, setTab] = useState("home");
	const [user, setUser] = useState(null);
	const [alertMsg, setAlertMsg] = useState("");
	const [alertType, setAlertType] = useState("info");

	useEffect(() => {
		const user = sessionStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
		const tab = sessionStorage.getItem("tab");
		if (tab) {
			setTab(tab);
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		sessionStorage.setItem("tab", tab);
	}, [tab]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				apiUrl: "https://stive-api.herokuapp.com",
				setAlertMsg,
				setAlertType,
			}}
		>
			<ThemeProvider theme={mdTheme}>
				<Box
					style={styles.paperContainer}
					sx={{
						backgroundColor: "background.default",
						minHeight: "100vh",
					}}
				>
					{!user ? (
						<SignIn />
					) : (
						<Box>
							<TopBar tab={tab} setTab={setTab} />
							{tab === "home" && <Home />}
							{tab === "clubs" && <Clubs />}
						</Box>
					)}
					<StickyFooter/>
				</Box>
				<Snackbar
					open={Boolean(alertMsg)}
					onClose={() => setAlertMsg("")}
					autoHideDuration={3000}
				>
					<Alert variant="outlined" severity={alertType}>
						{alertMsg}
					</Alert>
				</Snackbar>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
