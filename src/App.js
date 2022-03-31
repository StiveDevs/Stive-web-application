import { AppBar, Avatar, Box, IconButton, Tab, Tabs } from "@mui/material";
import {
	ArrowBackRounded,
	GroupsRounded,
	HomeRounded,
} from "@mui/icons-material";
import { useState } from "react";
import Home from "./components/home/Home";

function App() {
	const [value, setValue] = useState("home");
	return (
		<Box
			sx={{
				backgroundColor: "black",
				minHeight: "100vh",
			}}
		>
			<AppBar
				position="stickey"
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					px: 4,
				}}
			>
				<IconButton>
					<ArrowBackRounded />
				</IconButton>
				<Tabs
					value={value}
					onChange={(event, value) => setValue(value)}
					centered
				>
					<Tab icon={<HomeRounded />} label="HOME" value="home" />
					<Tab icon={<GroupsRounded />} label="CLUBS" value="clubs" />
				</Tabs>
				<IconButton>
					<Avatar />
				</IconButton>
			</AppBar>
			<Box>{value == "home" && <Home />}</Box>
		</Box>
	);
}

export default App;
