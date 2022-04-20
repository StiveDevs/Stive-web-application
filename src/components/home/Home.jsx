import { CircularProgress, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Postcard from "../postcard/Postcard";
import { UserContext } from "../../App";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setAlertMsg, setAlertType } = useContext(UserContext);

	useEffect(() => {
		async function setUp() {
			const res = await fetch("https://stive-api.herokuapp.com/post/");
			if (res.ok) {
				setPosts(await res.json());
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
				flexDirection: "column",
				gap: 4,
				alignItems: "center",
				py: 4,
			}}
		>
			{posts.length > 0 &&
				posts.map((post) => <Postcard post={post} />).reverse()}
		</Container>
	);
}
