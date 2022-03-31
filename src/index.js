import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const primaryClr = "#00FFFF";
const secondaryClr = "#008888";
const blackClr = "#000000";
const darkClr = "#00e0e0";
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
					backgroundColor: blackClr,
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
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={mdTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
