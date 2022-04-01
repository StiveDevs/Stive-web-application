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
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../App";

export default function ClubCard({ club, refresh, setRefresh }) {
	const { user, apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleDeleteClub = async () => {
		setIsLoading(true);
		const res = await fetch(`${apiUrl}/club/${club._id}`, {
			method: "delete",
		});
		if (res.ok) {
			setAlertType("warning");
			setAlertMsg("Club Deleted");
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsLoading(false);
		setRefresh(!refresh);
	};

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
				position: "relative",
			}}
		>
			<IconButton
				disabled={isLoading}
				sx={{ position: "absolute", top: 8, right: 8 }}
				onClick={handleDeleteClub}
			>
				<DeleteRounded />
			</IconButton>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flexGrow: 1,
				}}
			>
				<CardHeader title={club.name} />
				{club.logoUrl && (
					<CardMedia
						component="img"
						src={club.logoUrl}
						alt={club.name}
						sx={{
							maxWidth: 128,
							maxHeight: 128,
							p: 2,
						}}
					/>
				)}
			</CardContent>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 4,
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				{club.description}
				<Grid container={true} spacing="16">
					<Grid item xs="6">
						<Button
							variant="outlined"
							startIcon={<NewspaperRounded />}
							sx={{ width: "100%" }}
						>
							Posts
						</Button>
					</Grid>
					<Grid item xs="6">
						{club.members.findIndex(
							(student) => student._id === user._id
						) < 0 ? (
							<Button
								variant="outlined"
								startIcon={<PersonAddRounded />}
								sx={{ width: "100%" }}
							>
								Join Club
							</Button>
						) : (
							<Button
								variant="outlined"
								startIcon={<PersonRemoveRounded />}
								sx={{ width: "100%" }}
							>
								Leave Club
							</Button>
						)}
					</Grid>
					{club.members && (
						<Grid item={true} xs="6">
							<Button
								variant="outlined"
								startIcon={<PeopleRounded />}
								sx={{ width: "100%" }}
							>
								Members
							</Button>
							<AvatarGroup max={6} sx={{ py: 1 }}>
								{club.members.map((user) => (
									<Avatar
										src={user.profilePicUrl}
										alt={user.name}
										sx={{
											height: 16,
											width: 16,
										}}
									>
										{user.name
											.split(" ")
											.map((value) =>
												value[0].toUpperCase()
											)
											.join("")}
									</Avatar>
								))}
							</AvatarGroup>
						</Grid>
					)}
					{club.coordinators && (
						<Grid item={true} xs="6">
							<Button
								variant="outlined"
								startIcon={<AdminPanelSettingsRounded />}
								sx={{ width: "100%" }}
							>
								Coordinators
							</Button>
							<AvatarGroup max={6} sx={{ py: 1 }}>
								{club.coordinators.map((user) => (
									<Avatar
										src={user.profilePicUrl}
										alt={user.name}
										sx={{
											height: 16,
											width: 16,
										}}
									>
										{user.name
											.split(" ")
											.map((value) =>
												value[0].toUpperCase()
											)
											.join("")}
									</Avatar>
								))}
							</AvatarGroup>
						</Grid>
					)}
				</Grid>
			</CardContent>
		</Card>
	);
}
