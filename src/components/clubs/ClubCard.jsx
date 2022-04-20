import {
	AdminPanelSettingsRounded,
	DeleteRounded,
	NewspaperRounded,
	PeopleRounded,
	PersonAddRounded,
	PersonRemoveRounded,
	PostAddRounded,
} from "@mui/icons-material";
import {
	Avatar,
	AvatarGroup,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import MemberList from "./MemberList";
import SelectCoordinator from "./SelectCoordinator";
import SelectMembers from "./SelectMembers";
import Checkout from "../checkout/Checkout";
import StudentAvatar from "../common/StudentAvatar";

export default function ClubCard({ clubs, setClubs, index }) {
	const [club, setClub] = useState(clubs[index]);
	const { user, apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isMembershipLoading, setIsMembershipLoading] = useState(false);
	const [showMemberList, setShowMemberList] = useState(false);
	const [showSelectCoordinator, setShowSelectCoordinator] = useState(false);
	const [showSelectMembers, setShowSelectMembers] = useState(false);
	const [showCreatePost, setShowCreatePost] = useState(false);

	const getTimeStamp = (objectId) => {
		if (!objectId) {
			return new Date().toLocaleString();
		}
		const timeStamp = parseInt(objectId.substr(0, 8), 16) * 1000;
		const date = new Date(timeStamp);
		return date.toLocaleString();
	};

	const handleDeleteClub = async () => {
		setIsLoading(true);
		const res = await fetch(`${apiUrl}/club/${club._id}`, {
			method: "delete",
		});
		if (res.ok) {
			setAlertType("warning");
			setAlertMsg("Club Deleted");
			clubs.splice(index, 1);
			setClubs(clubs);
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsLoading(false);
	};

	const handleJoinClub = async () => {
		setIsMembershipLoading(true);
		const res = await fetch(
			`${apiUrl}/club/${club._id}/add/member/${user._id}`,
			{ method: "PATCH" }
		);
		if (res.ok) {
			club.members.push(user);
			setClub(club);
			setAlertType("success");
			setAlertMsg(`Joined club ${club.name} successfully`);
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsMembershipLoading(false);
	};

	const handleLeaveClub = async () => {
		setIsMembershipLoading(true);
		const res = await fetch(
			`${apiUrl}/club/${club._id}/remove/member/${user._id}`,
			{ method: "PATCH" }
		);
		if (res.ok) {
			const idx = club.members.findIndex(
				(value) => value._id === user._id
			);
			club.members.splice(idx, 1);
			setClub(club);
			setAlertType("success");
			setAlertMsg(`Left club ${club.name} successfully`);
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsMembershipLoading(false);
	};

	return (
		<Card elevation={4} sx={{ maxWidth: 512 }}>
			<MemberList
				showMemberList={showMemberList}
				setShowMemberList={setShowMemberList}
				members={club.members}
			/>
			<SelectCoordinator
				showSelectCoordinator={showSelectCoordinator}
				setShowSelectCoordinator={setShowSelectCoordinator}
				club={club}
				setClub={setClub}
			/>
			<SelectMembers
				showSelectMembers={showSelectMembers}
				setShowSelectMembers={setShowSelectMembers}
				club={club}
				setClub={setClub}
			/>
			<Checkout
				showCreatePost={showCreatePost}
				setShowCreatePost={setShowCreatePost}
			/>
			<CardHeader
				title={club.name}
				subheader={getTimeStamp(club._id)}
				avatar={
					<Avatar alt={club.name} src={club.logoUrl}>
						{club.name
							.split(" ")
							.map((value) => value[0].toUpperCase())
							.join("")}
					</Avatar>
				}
				action={
					user.isSGCMember && (
						<IconButton
							disabled={isLoading}
							onClick={() => {
								if (club.preview) return;
								handleDeleteClub();
							}}
						>
							<DeleteRounded />
						</IconButton>
					)
				}
			/>
			<CardContent>{club.description}</CardContent>
			<CardActions>
				<Button variant="outlined">
					<NewspaperRounded />
				</Button>
				{user.isSGCMember && (
					<Button
						variant="outlined"
						onClick={() => {
							if (club.preview) return;
							setShowSelectCoordinator(true);
						}}
					>
						<AdminPanelSettingsRounded />
					</Button>
				)}
				{club.coordinators.findIndex(
					(coordinator) => coordinator._id === user._id
				) >= 0 && (
					<Button
						variant="outlined"
						onClick={() => setShowSelectMembers(true)}
					>
						<AdminPanelSettingsRounded />
					</Button>
				)}
				{club.coordinators.findIndex(
					(coordinator) => coordinator._id === user._id
				) >= 0 && (
					<Button
						variant="outlined"
						onClick={() => setShowCreatePost(true)}
					>
						<PostAddRounded />
					</Button>
				)}
				{!user.isSGCMember &&
					(club.members.findIndex(
						(student) => student._id === user._id
					) < 0 ? (
						<Button
							variant="outlined"
							disabled={isMembershipLoading}
							onClick={handleJoinClub}
						>
							{isMembershipLoading && (
								<CircularProgress size={16} />
							)}
							<PersonAddRounded />
						</Button>
					) : (
						<Button
							variant="outlined"
							disabled={isMembershipLoading}
							onClick={handleLeaveClub}
						>
							{isMembershipLoading && (
								<CircularProgress size={16} />
							)}
							<PersonRemoveRounded />
						</Button>
					))}
				{club.members.length > 0 && (
					<Button
						variant="outlined"
						onClick={() => setShowMemberList(true)}
					>
						<PeopleRounded />
					</Button>
				)}
			</CardActions>
			<CardContent>
				{club.coordinators.length > 0 && (
					<AvatarGroup max={6}>
						{club.coordinators.map((coordinator) => (
							<StudentAvatar student={coordinator} />
						))}
					</AvatarGroup>
				)}
			</CardContent>
		</Card>
	);
}
