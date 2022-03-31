import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Postcard from "../postcard/Postcard";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function setUp() {
			try {
				const res = await fetch(
					"https://stive-api.herokuapp.com/post/"
				);
				setPosts(await res.json());
				setIsLoading(false);
			} catch (error) {
				console.log("HomeSetUp", error);
			}
		}
		setUp();
	}, []);

	return (
		<Box>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
					}}
				>
					{posts && posts.map((post) => <Postcard post={post} />)}
				</Box>
			)}
		</Box>
	);
}
