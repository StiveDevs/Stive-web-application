import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import {
	Box,
	CircularProgress,
	Dialog,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import ClubCard from "../clubs/ClubCard";

const steps = ["Fill club details", "Preview club"];

export default function CreateClub({ showCreateClub, setShowCreateClub }) {
	const [name, setName] = useState("");
	const [nameHelperText, setNameHelperText] = useState("");
	const [description, setDescriprion] = useState("");
	const [descriptionHelperText, setDescriptionHelperText] = useState("");
	const [logoUrl, setLogoUrl] = useState("");
	const [logoUrlHelperText, setLogoUrlHelperText] = useState("");
	const { apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = async () => {
		if (!name) {
			setNameHelperText("Club name is required");
			return;
		}
		setNameHelperText("");
		if (!description) {
			setDescriptionHelperText("Club description is required");
			return;
		}
		setDescriptionHelperText("");
		if (logoUrl) {
			try {
				new URL(logoUrl);
			} catch (error) {
				setLogoUrlHelperText("Invalid Url");
				return;
			}
		}
		setLogoUrlHelperText("");
		setActiveStep(activeStep + 1);
	};

	const handleCreateClub = async () => {
		setIsLoading(true);
		const data = { name, description };
		if (logoUrl) {
			data.logoUrl = logoUrl;
		}
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
		setActiveStep(0);
		setIsLoading(false);
	};

	return (
		<Dialog open={showCreateClub} onClose={() => setShowCreateClub(false)}>
			<Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 4 }}>
				{steps.map((value) => (
					<Step>
						<StepLabel>{value}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Paper
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
				{activeStep === 0 && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 2,
						}}
						component="form"
					>
						<Typography variant="h5">Create New Club</Typography>
						<TextField
							label="Name"
							value={name}
							required
							onChange={(event) => setName(event.target.value)}
							error={Boolean(nameHelperText)}
							helperText={nameHelperText}
						/>
						<TextField
							label="Description"
							value={description}
							error={Boolean(descriptionHelperText)}
							helperText={descriptionHelperText}
							required
							onChange={(event) =>
								setDescriprion(event.target.value)
							}
						/>
						<TextField
							error={Boolean(logoUrlHelperText)}
							helperText={logoUrlHelperText}
							label="Logo Url"
							value={logoUrl}
							onChange={(event) => setLogoUrl(event.target.value)}
						/>
					</Box>
				)}
				{activeStep === 1 && (
					<ClubCard
						clubs={[
							{
								name,
								description,
								logoUrl,
								coordinators: [],
								members: [],
								preview: true,
							},
						]}
						index={0}
					/>
				)}
				<Box sx={{ display: "flex", gap: 2 }}>
					{activeStep === 0 && (
						<Button variant="outlined" onClick={handleNext}>
							Next
						</Button>
					)}
					{activeStep === 1 && (
						<Button
							variant="outlined"
							onClick={() => setActiveStep(activeStep - 1)}
						>
							Back
						</Button>
					)}
					{activeStep === 1 && (
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
					)}
				</Box>
			</Paper>
		</Dialog>
	);
}
