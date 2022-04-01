import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgress, Dialog, Paper, Typography } from "@mui/material";

export default function CreateClub({ showCreateClub, setShowCreateClub }) {
	const [name, setName] = useState("");
	const [description, setDescriprion] = useState("");
	const [logoUrl, setLogoUrl] = useState("");
	const [logoUrlHelperText, setLogoUrlHelperText] = useState("");
	const { apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleCreateClub = async () => {
		setIsLoading(true);
		const data = { name, description };
		if (logoUrl) {
			data.logoUrl = logoUrl;
			try {
				new URL(logoUrl);
			} catch (error) {
				setLogoUrlHelperText("Invalid Url");
				setIsLoading(false);
				return;
			}
		}
		setLogoUrlHelperText("");
		const res = await fetch(`${apiUrl}/club`, {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			setAlertType("success");
			setAlertMsg("Club created successfully");
		} else {
			setAlertType("error");
			setAlertMsg((await res.json()).message);
		}
		setIsLoading(false);
	};

	return (
		<Dialog open={showCreateClub} onClose={() => setShowCreateClub(false)}>
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
				<Typography variant="h5">Create New Club</Typography>
				<TextField
					label="Name"
					autoComplete="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					label="Description"
					value={description}
					onChange={(event) => setDescriprion(event.target.value)}
				/>
				<TextField
					error={Boolean(logoUrlHelperText)}
					helperText={logoUrlHelperText}
					label="Logo Url"
					value={logoUrl}
					onChange={(event) => setLogoUrl(event.target.value)}
				/>
				<Button
					disabled={isLoading}
					onClick={handleCreateClub}
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
					Create Club
				</Button>
			</Paper>
		</Dialog>
	);
}
