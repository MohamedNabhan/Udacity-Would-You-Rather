import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom';
import check from '../check.png'
class QuestionPage extends Component {
    state = {
        selectedAnswer: ''
    }
    handleSaveAnswer(e) {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { selectedAnswer } = this.state
    
        dispatch(handleAddAnswer({
          qid:id,
          authedUser,
          answer: selectedAnswer,
        }))
    }
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return {selectedAnswer: answer}
        })
    }
    render() {
        const { question, author, answered, answer, votesOptionOne, votesOptionTwo, totalVotes, percentageOptionOne, percentageOptionTwo } = this.props;
        const { selectedAnswer } = this.state;

        if (!question) {
            return <Redirect to="/not-found"/>
        }

        return (
            <div className='answer-question'>
                <h1 className="mark-poll">{author.name} Question</h1>
                <div className="card-list">
                    <div className='card answer'>
                    <div className="user-img">
                        <img  src={`/${author.avatarURL}`} alt={author.name}/>
                    </div>
                    
                    {!answered ? (
                        <div>
                            <div>Would You Rather? - Choose One</div>
                            <div className='poll-choice mark-poll'>
                                <div className={selectedAnswer === 'optionOne' ? 'option option-active' : 'option'} onClick={(e) => { this.chooseAnswer('optionOne')}}>*Option 1 :  {question.optionOne.text}</div>
                                <div className={selectedAnswer === 'optionTwo' ? 'option option-active' : 'option'} onClick={(e) => { this.chooseAnswer('optionTwo')}}>*Option 2 : {question.optionTwo.text}</div>
                            </div>
                            <button className={ selectedAnswer ? 'active active-brown' : 'disabled'} onClick={(e) => {this.handleSaveAnswer(e)}}>Submit</button>
                        </div>
                    ): (
                        <div>
                            <div>Results:</div>
                            <div className={answer === 'optionOne' ? 'option-container selected': 'option-container'}>
                                <div className="option-one">{question.optionOne.text}</div>
                                <div className="poll-container">
                                    <div>{votesOptionOne} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentageOptionOne}%</div>
                                </div>
                                <div className="your-vote">	<img src={check}/></div>
                            </div>

                            <div className={answer === 'optionTwo' ? 'option-container selected': 'option-container'}>
                                <div className="option-two">{question.optionTwo.text}</div>

                                <div className="poll-container">
                                    <div>{votesOptionTwo} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentageOptionTwo}%</div>
                                </div>
                                <div className="your-vote">	<img src={check}/></div>
                            </div>
                        </div>
                    )}

                    </div>
                   
            
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, users, questions}, { match }) => {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const votesOptionOne = (question && question.optionOne.votes) && question.optionOne.votes.length 
    const votesOptionTwo = (question && question.optionTwo.votes) && question.optionTwo.votes.length
    const totalVotes = votesOptionOne + votesOptionTwo
    const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
    const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)
    const answer = users[authedUser].answers[id]
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo,
    }
}

export default connect(mapStateToProps)(QuestionPage);