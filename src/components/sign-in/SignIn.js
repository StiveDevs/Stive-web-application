import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgress } from "@mui/material";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [helperText, setHelperText] = useState("");
	const { user, setUser, apiUrl } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async () => {
		if (!email.endsWith("@iiitg.ac.in")) {
			setHelperText("Email not from IIITG");
			return;
		}
		setHelperText("");
		setIsLoading(true);
		try {
			await fetch(`${apiUrl}/student`, {
				method: "post",
				body: JSON.stringify({ email }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const res = await fetch(`${apiUrl}/student`);
			const students = await res.json();
			for (const student of students) {
				if (student.email === email) {
					setUser(student);
					sessionStorage.setItem("user", JSON.stringify(student));
					break;
				}
			}
		} catch (error) {
			console.log("SignInHandleSignIn", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
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
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<TextField
					error={Boolean(helperText)}
					helperText={helperText}
					label="Email Address"
					autoComplete="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
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
