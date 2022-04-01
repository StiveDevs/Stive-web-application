import * as React from "react";
import { AppBar, Avatar, IconButton, Tab, Tabs } from "@mui/material";
import {
	ArrowBackRounded,
	GroupsRounded,
	HomeRounded,
} from "@mui/icons-material";

export default function TopBar({ tab, setTab }) {
	return (
		<AppBar
			position="sticky"
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
				value={tab}
				onChange={(event, newTab) => setTab(newTab)}
				centered
			>
				<Tab icon={<HomeRounded />} label="HOME" value="home" />
				<Tab icon={<GroupsRounded />} label="CLUBS" value="clubs" />
			</Tabs>
			<IconButton>
				<Avatar />
			</IconButton>
		</AppBar>
	);
}
