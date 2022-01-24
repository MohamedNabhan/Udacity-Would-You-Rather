import React, { Component } from 'react'
import { connect } from 'react-redux'

const Leaderboard = ({leaders}) => {
    return (
        <div className='LeaderBoard'>
            <h1 className="mark-poll">Leader Board</h1>
            <ul className="card-list">
                {   leaders.map((leader) => (
                        <li key={leader.id} className='card'>
                            <div className="user-img">
                                <img src={`/${leader.avatarURL}`}  alt={leader.name}/>
                            </div>
                            <div className="username">{leader.name}</div>
                            <div>Created questions : {leader.questions.length}</div>
                            <div>Answered questions : {Object.keys(leader.answers).length}</div>
                            <div className="mark-poll">Total Score: {leader.totalScore}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
const mapStateToProps = ({ users }) => {
    const usersList = Object.values(users)
    usersList.map(user => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {leaders: usersList}
}

export default connect(mapStateToProps)(Leaderboard);