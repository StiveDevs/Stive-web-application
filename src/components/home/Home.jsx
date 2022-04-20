import { CircularProgress, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Postcard from "../postcard/Postcard";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			{posts.length > 0 && posts.map((post) => <Box > <Postcard maxWidth="200" post={post} /> </Box>).reverse()}

		</Container>
	);
}
