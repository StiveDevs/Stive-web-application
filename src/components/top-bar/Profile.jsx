import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgress, Dialog, Paper, Typography } from "@mui/material";

export default function Profile({ showProfile, setShowProfile }) {
	const { user, setUser, apiUrl, setAlertType, setAlertMsg } =
		useContext(UserContext);
	const [name, setName] = useState(user.name ? user.name : "");
	const [rollNo, setRollNo] = useState(user.rollNo ? user.rollNo : "");
	const [profilePicUrl, setProfilePicUrl] = useState(
		user.profilePicUrl ? user.profilePicUrl : ""
	);
	const [rollNoHelperText, setRollNoHelperText] = useState("");
	const [profilePicUrlHelperText, setProfilePicUrlHelperText] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdateProfile = async () => {
		const data = { email: user.email };
		if (name) data.name = name;
		if (rollNo) {
			if (rollNo.length !== 7 || isNaN(rollNo)) {
				setRollNoHelperText("Invalid Roll No");

				return;
			}
			data.rollNo = rollNo;
		}
		setRollNoHelperText("");
		setIsLoading(true);
		try {
			if (profilePicUrl) {
				new URL(profilePicUrl);
			}
			data.profilePicUrl = profilePicUrl;
		} catch (error) {
			setProfilePicUrlHelperText("Invalid Url");
			setIsLoading(false);
			return;
		}
		setProfilePicUrlHelperText("");
		const res = await fetch(`${apiUrl}/student`, {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			data._id = user._id;
			if (user.email.endsWith("sgc@iiitg.ac.in")) {
				data.isSGCMember = true;
			}
			setUser(data);
			setAlertType("success");
			setAlertMsg("Profile updated successfully");
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsLoading(false);
	};

	return (
		<Dialog open={showProfile} onClose={() => setShowProfile(false)}>
			<Paper
				component="form"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative",
					gap: 2,
					py: 4,
					px: 8,
				}}
			>
				<Typography variant="h5">Profile</Typography>
				<TextField
					label="Email"
					value={user.email}
					disabled={true}
					sx={{ ":disabled": { color: "primary" } }}
				/>
				<TextField
					label="Name"
					autoComplete="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					error={Boolean(rollNoHelperText)}
					helperText={rollNoHelperText}
					label="Roll No"
					value={rollNo}
					onChange={(event) => setRollNo(event.target.value)}
				/>
				<TextField
					error={Boolean(profilePicUrlHelperText)}
					helperText={profilePicUrlHelperText}
					label="Profile Pic Url"
					value={profilePicUrl}
					onChange={(event) => setProfilePicUrl(event.target.value)}
				/>
				<Button
					disabled={isLoading}
					onClick={handleUpdateProfile}
					variant="outlined"
					sx={{
						":disabled": {
							color: "text.secondary",
						},
						display: "flex",
						gap: 2,
					}}
				>
					{isLoading && <CircularProgress />}
					Update Profile
				</Button>
			</Paper>
		</Dialog>
	);
}
