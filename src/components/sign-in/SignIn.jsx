import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgress } from "@mui/material";
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [helperText, setHelperText] = useState("");
	const { setUser, apiUrl, setAlertType, setAlertMsg } =
		useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

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

	const handleSignIn = async () => {
		if (!email.endsWith("@iiitg.ac.in")) {
			setHelperText("Email not from IIITG");
			return;
		}
		setHelperText("");
		setIsLoading(true);
		try {
			let res = await fetch(`${apiUrl}/student`);
			const students = await res.json();
			const hashedPassword = bcrypt.hashSync(password);
			// console.log(hashedPassword);
			// to verify :: const validPassword = await bcrypt.compare(password, hashedPassword);


			for (const student of students) {
				if (student.email === email) {
					if (!student.name) {
						student.name = getNameFromEmail(email);
					}
					if (student.email.endsWith("sgc@iiitg.ac.in")) {
						student.isSGCMember = true;
					}
					setUser(student);
					setIsLoading(false);
					return;
				}
			}
			res = await fetch(`${apiUrl}/student`, {
				method: "post",
				body: JSON.stringify({ email }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			let isSGCMember = false;
			if (email.endsWith("sgc@iiitg.ac.in")) {
				isSGCMember = true;
			}
			setUser({
				_id: data.upsertedId,
				email,
				name: getNameFromEmail(email),
				isSGCMember,
			});
			setAlertType("success");
			setAlertMsg("Signin successful");
		} catch (error) {
			console.log("SignInHandleSignIn", error);
			setAlertType("error");
			setAlertMsg(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			sx={{
				position: "absolute",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
				bgcolor: "background.default",
				zIndex: 9999,
			}}
		>
			<Box
				component="form"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
					position: "relative",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<LockOutlinedIcon color="primary" />
				<Typography component="h1" variant="h5" color="text.primary">
					Sign in
				</Typography>
				<TextField
					error={Boolean(helperText)}
					helperText={helperText}
					label="Email"
					autoComplete="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<TextField
					error={Boolean(helperText)}
					helperText={helperText}
					label="Password"
					value={password}
					type="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button
					disabled={isLoading}
					onClick={handleSignIn}
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
					Sign In
				</Button>
			</Box>
		</Box>
	);
}
