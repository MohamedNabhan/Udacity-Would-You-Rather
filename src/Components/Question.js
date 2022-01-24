import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        const { question, author } = this.props;
        return (
            <ul className="card-list">
                <li key={author.id} className='card'>
                    <div className="user-img">
                        <img src={`/${author.avatarURL}`}  alt={author.name}/>
                    </div>
                    <div className="username">{author.name} asks</div>
                    <div>Would you rather?</div>
                    <div>* {question.optionOne.text} ?</div>
                    <div>------OR------</div>
                    <div>* {question.optionTwo.text} ?</div>
                    <button className="mark-poll">View Poll</button>
                </li>
            </ul>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
  
    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(Question);