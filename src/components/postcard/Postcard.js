import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Favorite from "@material-ui/icons/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Poll from "./Poll";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function Postcard({ post }) {
	const [expanded, setExpanded] = React.useState(false);
	const [likeBtn, setLikeBtn] = React.useState(false);

	const getTimeStamp = (objectId) => {
		const timeStamp = parseInt(objectId.substr(0, 8), 16) * 1000;
		const date = new Date(timeStamp);
		return date.toLocaleString();
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleLikeClick = () => {
		setLikeBtn(!likeBtn);
	};

	return (
		<Card sx={{ maxWidth: 600, m: 5 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						{post.title[0]}
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={post.title}
				subheader={getTimeStamp(post._id)}
			/>
			{post.imageUrl && (
				<CardMedia
					component="img"
					height="215" // size MUST be 215px(discuss it,if u wanna change it)
					image={post.imageUrl}
					alt={post.title}
				/>
			)}
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{post.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Favorite
						onClick={handleLikeClick}
						color={likeBtn ? "secondary" : "action"}
					/>
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Poll post={post}/>
				</CardContent>
			</Collapse>
		</Card>
	);
}
