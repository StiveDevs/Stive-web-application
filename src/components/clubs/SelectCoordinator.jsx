import { ListItemAvatar } from "@material-ui/core";
import {
	Autocomplete,
	Avatar,
	Button,
	CircularProgress,
	Dialog,
	ListItem,
	ListItemText,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

export default function SelectCoordinator({
	showSelectCoordinator,
	setShowSelectCoordinator,
	club,
	setClub,
}) {
	const [students, setStudents] = useState([]);
	const [coordinators, setCoordinators] = useState(club.coordinators);
	const [isLoading, setIsLoading] = useState(true);
	const { apiUrl, setAlertMsg, setAlertType } = useContext(UserContext);

	useEffect(() => {
		const setUp = async () => {
			const res = await fetch(`${apiUrl}/student`);
			if (res.ok) {
				const students = await res.json();
				for (let index = 0; index < students.length; index++) {
					if (!students[index].name)
						students[index].name = getNameFromEmail(
							students[index].email
						);
					if (!students[index].rollNo) {
						students[index].rollNo = "";
					}
					if (!students[index].profilePicUrl) {
						students[index].profilePicUrl = "";
					}
				}
				setStudents(students);
			}
			setIsLoading(false);
		};
		setUp();
	}, []);

	const handleModifyCoordinators = async () => {
		setIsLoading(true);
		for (let i = 0; i < coordinators.length; i++) {
			const j = club.coordinators.findIndex(
				(val) => val._id === coordinators[i]._id
			);
			if (j < 0) {
				await fetch(
					`${apiUrl}/club/${club._id}/add/coordinator/${coordinators[i]._id}`,
					{ method: "PATCH" }
				);
			}
		}
		for (let i = 0; i < club.coordinators.length; i++) {
			const j = coordinators.findIndex(
				(val) => val._id === club.coordinators[i]._id
			);
			if (j < 0) {
				await fetch(
					`${apiUrl}/club/${club._id}/remove/coordinator/${club.coordinators[i]._id}`,
					{ method: "PATCH" }
				);
			}
		}
		club.coordinators = coordinators;
		setClub(club);
		setAlertType("success");
		setAlertMsg(`Coordinators of ${club.name} modified successfully`);
		setIsLoading(false);
	};

	const getNameFromEmail = (email) => {
		email = email.substring(0, email.indexOf("@"));
		if (!email.includes(".")) {
			return email[0].toUpperCase() + email.substring(1);
		}
		const [firstName, lastName] = email.split(".");
		return (
			firstName[0].toUpperCase() +
			firstName.substring(1) +
			" " +
			lastName[0].toUpperCase() +
			lastName.substring(1)
		);
	};

	const getStudentLabel = (student) => {
		if (student.name && student.rollNo)
			return student.name + " " + student.rollNo;
		if (student.name) return student.name;
		let email = student.email;
		email = email.substring(0, email.indexOf("@"));
		let name = "";
		if (!email.includes(".")) {
			name = email[0].toUpperCase() + email.substring(1);
		} else {
			const [firstName, lastName] = email.split(".");
			name =
				firstName[0].toUpperCase() +
				firstName.substring(1) +
				" " +
				lastName[0].toUpperCase() +
				lastName.substring(1);
		}
		if (student.rollNo) return name + " " + student.rollNo;
		else return name;
	};

	return (
		<Dialog
			open={showSelectCoordinator}
			onClose={() => setShowSelectCoordinator(false)}
		>
			<Paper
				sx={{
					p: 2,
					minWidth: 320,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Modify Coordinators
				</Typography>
				<Autocomplete
					multiple
					options={students}
					onChange={(_, value) => setCoordinators(value)}
					getOptionLabel={getStudentLabel}
					isOptionEqualToValue={(option, value) =>
						option._id === value._id
					}
					loading={isLoading}
					filterSelectedOptions
					defaultValue={club.coordinators}
					renderOption={(props, student) => (
						<ListItem {...props} key={student._id}>
							<ListItemAvatar>
								<Avatar
									alt={student.name}
									src={student.profilePicUrl}
								>
									{student.name
										.split(" ")
										.map((value) => value[0].toUpperCase())
										.join("")}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={student.name}
								secondary={student.rollNo}
							/>
						</ListItem>
					)}
					renderInput={(params) => (
						<TextField {...params} label="Select" />
					)}
				/>
				<Button
					disabled={isLoading}
					onClick={handleModifyCoordinators}
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
					Modify
				</Button>
			</Paper>
		</Dialog>
	);
}
