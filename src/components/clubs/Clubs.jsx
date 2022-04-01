import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import ClubCard from "./ClubCard";
import { UserContext } from "../../App";

export default function Clubs() {
	const [clubs, setClubs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setAlertMsg, setAlertType } = useContext(UserContext);
	const [refresh, setRefresh] = useState(false);

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
	}, [refresh]);

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
				flexDirection: "column",
				alignItems: "center",
				p: 4,
				gap: 4,
			}}
		>
			{clubs &&
				clubs.map((club) => (
					<ClubCard
						club={club}
						refresh={refresh}
						setRefresh={setRefresh}
					/>
				))}
		</Container>
	);
}
