import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import ClubCard from "./ClubCard";
import { UserContext } from "../../App";

export default function Clubs() {
	const [clubs, setClubs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setAlertMsg, setAlertType } = useContext(UserContext);

	useEffect(() => {
		async function setUp() {
			const res = await fetch("https://stive-api.herokuapp.com/club/");
			if (res.ok) {
				setClubs(await res.json());
			} else {
				setAlertType("error");
				setAlertMsg((await res.json()).message);
			}
			setIsLoading(false);
		}
		setUp();
	}, []);

	if (isLoading)
		return (
			<CircularProgress
				sx={{ position: "absolute", top: "50%", left: "50%" }}
			/>
		);

	return (
		<Container
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-around",
				p: 4,
				gap: 4,
			}}
		>
			{clubs.length > 0 &&
				clubs.map((_, index) => (
					<ClubCard clubs={clubs} setClubs={setClubs} index={index} />
				))}
		</Container>
	);
}
