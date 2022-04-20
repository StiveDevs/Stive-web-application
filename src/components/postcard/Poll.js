import React, { useContext, useEffect, useState } from "react";
import Poll from "react-polls";
import Container from "@mui/material/Container";
import { UserContext } from "../../App";
import { CircularProgress } from "@mui/material";

const pollStyles1 = {
	questionSeparator: true,
	questionSeparatorWidth: "question",
	questionBold: true,
	questionColor: "lightgrey",
	align: "center",
	theme: "cyan",
};

export default function Polls({ poll }) {
	const [answers, setAnswers] = useState([]);
	const [vote, setVote] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { user, apiUrl } = useContext(UserContext);

	useEffect(() => {
		for (const option of poll.options) {
			answers.push({
				option: option.name,
				votes: option.selectedBy.length,
			});
			if (
				option.selectedBy.findIndex(
					(value) => value._id === user._id
				) >= 0
			) {
				setVote(option.name);
			}
		}
	}, []);

	const handleVote = async (voteAnswer) => {
		setIsLoading(true);
		for (let i = 0; i < answers.length; i++) {
			if (vote) break;
			if (
				answers[i].option === voteAnswer &&
				poll.options[i].selectedBy.findIndex(
					(value) => value._id === user._id
				) < 0
			) {
				await fetch(
					`${apiUrl}/option/${poll.options[i]._id}/add/selectedBy/${user._id}`,
					{
						method: "PATCH",
					}
				);
				answers[i].votes++;
				poll.options[i].selectedBy.push(user);
				setAnswers(answers);
				setVote(answers[i].option);
			}
		}
		setIsLoading(false);
	};

	if (isLoading) return <CircularProgress />;

	return (
		<Poll
			question={poll.name}
			answers={answers}
			onVote={handleVote}
			customStyles={pollStyles1}
			vote={vote}
			noStorage
		/>
	);
}
