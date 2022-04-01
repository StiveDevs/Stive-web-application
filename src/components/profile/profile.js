import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgress, Dialog, Paper, Typography } from "@mui/material";

export default function Profile({ showProfile, setShowProfile }) {
	const [name, setName] = useState("");
	const [rollNo, setRollNo] = useState("");
	const [profilePicUrl, setProfilePicUrl] = useState("");
	const [rollNoHelperText, setRollNoHelperText] = useState("");
	const [profilePicUrlHelperText, setProfilePicUrlHelperText] = useState("");
	const { user, setUser, apiUrl, setAlertType, setAlertMsg } =
		useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user.name) setName(user.name);
		if (user.rollNo) setRollNo(user.rollNo);
		if (user.profilePicUrl) setProfilePicUrl(user.profilePicUrl);
	}, []);

	const handleUpdateProfile = async () => {
		if (rollNo && (rollNo.length !== 7 || isNaN(rollNo))) {
			setRollNoHelperText("Invalid Roll No");
			return;
		}
		setRollNoHelperText("");
		setIsLoading(true);
		try {
			if (profilePicUrl) await fetch(profilePicUrl);
		} catch (error) {
			console.log(error);
			setProfilePicUrlHelperText("Invalid Url");
			setIsLoading(false);
			return;
		}
		setProfilePicUrlHelperText("");
		try {
			const newData = { email: user.email };
			if (rollNo) newData.rollNo = rollNo;
			if (name) newData.name = name;
			if (profilePicUrl) newData.profilePicUrl = profilePicUrl;
			await fetch(`${apiUrl}/student`, {
				method: "post",
				body: JSON.stringify(newData),
				headers: {
					"Content-Type": "application/json",
				},
			});
			newData._id = user._id;
			setUser(newData);
			setAlertType("success");
			setAlertMsg("Profile updated successfully");
		} catch (error) {
			console.log("SignInHandleSignIn", error);
			setAlertType("error");
			setAlertMsg(error);
		} finally {
			setIsLoading(false);
		}
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
