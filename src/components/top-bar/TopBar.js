import { AppBar, Avatar, IconButton, Tab, Tabs } from "@mui/material";
import {
	ArrowBackRounded,
	GroupsRounded,
	HomeRounded,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Profile from "../profile/profile";

export default function TopBar({ tab, setTab }) {
	const { user } = useContext(UserContext);
	const [showProfile, setShowProfile] = useState(false);

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
			<IconButton onClick={() => setShowProfile(true)}>
				<Avatar src={user.profilePicUrl} alt={user.name}>
					{user.name
						.split(" ")
						.map((value) => value[0].toUpperCase())
						.join("")}
				</Avatar>
			</IconButton>
			{showProfile && (
				<Profile
					showProfile={showProfile}
					setShowProfile={setShowProfile}
				/>
			)}
		</AppBar>
	);
}
