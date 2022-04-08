import { ListItemAvatar } from "@material-ui/core";
import {
	Autocomplete,
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
import StudentAvatar, { getNameFromEmail } from "../common/StudentAvatar";

export default function SelectMembers({
	showSelectMembers,
	setShowSelectMembers,
	club,
	setClub,
}) {
	const [students, setStudents] = useState([]);
	const [members, setMembers] = useState(club.members);
	const [isLoading, setIsLoading] = useState(true);
	const { apiUrl, setAlertMsg, setAlertType } = useContext(UserContext);

	useEffect(() => {
		const setUp = async () => {
			const res = await fetch(`${apiUrl}/student`);
			if (res.ok) {
				setStudents(await res.json());
			}
			setIsLoading(false);
		};
		setUp();
	}, []);

	const handleModifyMembers = async () => {
		setIsLoading(true);
		for (let i = 0; i < members.length; i++) {
			const j = club.members.findIndex(
				(val) => val._id === members[i]._id
			);
			if (j < 0) {
				await fetch(
					`${apiUrl}/club/${club._id}/add/member/${members[i]._id}`,
					{ method: "PATCH" }
				);
			}
		}
		for (let i = 0; i < club.members.length; i++) {
			const j = members.findIndex(
				(val) => val._id === club.members[i]._id
			);
			if (j < 0) {
				await fetch(
					`${apiUrl}/club/${club._id}/remove/member/${club.members[i]._id}`,
					{ method: "PATCH" }
				);
			}
		}
		club.members = members;
		setClub(club);
		setAlertType("success");
		setAlertMsg(`Members of ${club.name} modified successfully`);
		setIsLoading(false);
	};

	const getStudentLabel = (student) => {
		if (student.name && student.rollNo)
			return student.name + " " + student.rollNo;
		if (student.name) return student.name;
		const name = getNameFromEmail(student.email);
		if (student.rollNo) return name + " " + student.rollNo;
		else return name;
	};

	return (
		<Dialog
			open={showSelectMembers}
			onClose={() => setShowSelectMembers(false)}
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
					Modify Members
				</Typography>
				<Autocomplete
					multiple
					options={students}
					onChange={(_, value) => setMembers(value)}
					getOptionLabel={getStudentLabel}
					isOptionEqualToValue={(option, value) =>
						option._id === value._id
					}
					loading={isLoading}
					filterSelectedOptions
					defaultValue={club.members}
					renderOption={(props, student) => (
						<ListItem {...props} key={student._id}>
							<ListItemAvatar>
								<StudentAvatar student={student} />
							</ListItemAvatar>
							<ListItemText
								primary={
									student.name
										? student.name
										: getNameFromEmail(student.email)
								}
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
					onClick={handleModifyMembers}
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
