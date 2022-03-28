import React, { Component } from 'react'
import Poll from 'react-polls'
import Container from '@mui/material/Container';


const pollQuestion1 = 'Kaisa laga sir?'
const pollAnswers1 = [
    { option: 'Mast', votes: 1 },
    { option: 'Bohot Mast', votes: 2 },
    { option: 'Mind blowing', votes: 3 }
]
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'blue'
}


export default class App extends Component {
    state = {
        pollAnswers1: [...pollAnswers1],
    }

    handleVote = (voteAnswer, pollAnswers, pollNumber) => {
        const newPollAnswers = pollAnswers.map(answer => {
            if (answer.option === voteAnswer) answer.votes++
            return answer
        })

        if (pollNumber === 1) { // For handeling multiple poll's, we will use pollNumber
            this.setState({
                pollAnswers1: newPollAnswers
            })
        }
    }

    render() {
        const { pollAnswers1 } = this.state

        return (
            <Container maxWidth="sm">
                <div>
                    <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
                </div>
            </Container>
        )
    }
}