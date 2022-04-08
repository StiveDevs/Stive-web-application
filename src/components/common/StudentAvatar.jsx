import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export const getNameFromEmail = (email) => {
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

export default function StudentAvatar({ student }) {
	const [name, setName] = useState("");
	const [shortName, setShortName] = useState("");

	useEffect(() => {
		if (!student.name) student.name = getNameFromEmail(student.email);
		setName(student.name);
		const idx = student.email.indexOf(".");
		setShortName(
			student.email[0].toUpperCase() +
				student.email[idx + 1].toUpperCase()
		);
	}, []);

	return (
		<Avatar alt={name} src={student.profilePicUrl}>
			{shortName}
		</Avatar>
	);
}
