import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import QuestionTile from './QuestionTile'
import Question from './Question'

class Home extends Component {
    state = {
        showAnswered: false
    }
    filterQuestions = (showAnswered) => {
        this.setState({
          showAnswered: !showAnswered
        })
    }
    render() {
        const { showAnswered } = this.state;
        const { questions, authedUser } = this.props
        const filteredQuestions = Object.values(questions).filter(question => {
            const answered = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return showAnswered ? answered : !answered
        });
        return (
            <div className="Home">
                <h1 className="mark-poll">Questions</h1>
                <button className={ !showAnswered && 'active'} onClick={(e) => this.filterQuestions(true)}>Unanswered Questions</button>
                <button className={ showAnswered && 'active'} onClick={(e) => this.filterQuestions(false)}>Answered Questions</button>
                <ul className="card-list">
                    {filteredQuestions.map((question) => (
                        <li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <Question id={question.id}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default connect(({authedUser,questions}) => ({ authedUser,questions}))(Home);