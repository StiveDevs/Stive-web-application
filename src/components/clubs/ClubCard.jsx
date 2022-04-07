import {
	AdminPanelSettingsRounded,
	DeleteRounded,
	NewspaperRounded,
	PeopleRounded,
	PersonAddRounded,
	PersonRemoveRounded,
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

export default function ClubCard({ clubs, setClubs, index }) {
	const [club, setClub] = useState(clubs[index]);
	const { user, apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isMembershipLoading, setIsMembershipLoading] = useState(false);
	const [showMemberList, setShowMemberList] = useState(false);
	const [showSelectCoordinator, setShowSelectCoordinator] = useState(false);

	const getTimeStamp = (objectId) => {
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
		<Card>
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
							onClick={handleDeleteClub}
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
						onClick={() => setShowSelectCoordinator(true)}
					>
						<AdminPanelSettingsRounded />
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
						{club.coordinators.map((user) => (
							<Avatar src={user.profilePicUrl} alt={user.name}>
								{user.name
									.split(" ")
									.map((value) => value[0].toUpperCase())
									.join("")}
							</Avatar>
						))}
					</AvatarGroup>
				)}
			</CardContent>
		</Card>
	);
}
