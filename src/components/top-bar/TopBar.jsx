import { AppBar, Avatar, IconButton, Tab, Tabs } from "@mui/material";
import {
	GroupsRounded,
	HomeRounded,
	ChatRounded,
	GroupAddRounded,
	LogoutRounded,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Profile from "./Profile";
import CreateClub from "./CreateClub";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkout from "../checkout/Checkout";

export default function TopBar({ tab, setTab }) {
	const { user, setUser } = useContext(UserContext);
	const [showProfile, setShowProfile] = useState(false);
	const [showCreateClub, setShowCreateClub] = useState(false);
	const [showCreatePost, setShowCreatePost] = useState(false);

	return (
		<AppBar
			position="sticky"
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				bgcolor: "background.paper",
				color: "text.secondary",
				px: 4,
			}}
		>
			<ButtonGroup variant="text" aria-label="text button group">
				<IconButton onClick={() => setUser(null)}>
					<LogoutRounded />
				</IconButton>
				{user.isSGCMember && (
					<IconButton onClick={() => setShowCreateClub(true)}>
						<GroupAddRounded />
					</IconButton>
				)}
			</ButtonGroup>
			<Tabs
				value={tab}
				onChange={(event, newTab) => setTab(newTab)}
				centered
			>
				<Tab icon={<HomeRounded />} value="home" />
				<Tab icon={<GroupsRounded />} value="clubs" />
				{/* <Tab icon={<ChatRounded />} value="messages" /> */}
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
			{showCreateClub && (
				<CreateClub
					showCreateClub={showCreateClub}
					setShowCreateClub={setShowCreateClub}
				/>
			)}
			{showCreatePost && (
				<Checkout
					showCreatePost={showCreatePost}
					setShowCreatePost={setShowCreatePost}
				/>
			)}
		</AppBar>
	);
}
