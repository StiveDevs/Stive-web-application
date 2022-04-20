import React, { Component } from 'react'
import Poll from 'react-polls'
import Container from '@mui/material/Container';
import { useContext, useState } from "react";
import { UserContext } from "../../App";

const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: 'lightgrey',
    align: 'center',
    theme: 'cyan'
}


export default function Polls({ post }) {
    const { apiUrl, setAlertType, setAlertMsg } = useContext(UserContext);

    const pollQuestion = post.polls[0].name;
    var pollAnswers = [];
    const getOptions = post.polls[0].options;
    for (let i = 0; i < getOptions.length; i++) {
        let prevPollVotes = 0;
        if(getOptions[i].selectedBy)
            prevPollVotes = getOptions[i].selectedBy.length;
        pollAnswers.push({ option: getOptions[i].name, votes: prevPollVotes });
    }

    const handleVote = async (voteAnswer, pollAnswers, pollNumber) => {
        const newPollAnswers = pollAnswers.map(answer => {
            if (answer.option === voteAnswer)
                answer.votes++
            return answer
        })
        for (let i = 0; i < getOptions.length; i++) {
            if (voteAnswer == getOptions[i].name) {
                console.log(voteAnswer);
                console.log(pollAnswers);
                console.log(getOptions[i]._id);
                // const res = await fetch(`${apiUrl}/option/${getOptions[i]._id}/add/selectedBy/${selectedBy}`, {
                //     method: "patch",
                // });
                // if (res.ok) {
                //     setAlertType("success");
                //     setAlertMsg("Option added successfully");
                // } else {
                //     setAlertType("error");
                //     setAlertMsg((await res.json()).message);
                // }
                break;
            }
        }
    }

    return (
        <Container maxWidth="sm">
            <div>
                <Poll question={pollQuestion} answers={pollAnswers} onVote={voteAnswer => handleVote(voteAnswer, pollAnswers, 1)} customStyles={pollStyles1} noStorage />
            </div>
        </Container>
    )
}