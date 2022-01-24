import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
    
class Navigation extends Component {
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (
        <nav className='nav'>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/add' > New Question</Link>
                </li>
                <li>
                    <Link to='/leaderboard' >Leader Board</Link>
                </li>
                { authedUser && 
                    <li className="user-info">
                        <Link to='/'>
                            <div className="nav-user">
                                <span>Hello {name}</span>
                                <img
                                src={avatar}
                                alt={`Avatar of ${authedUser}`}
                                className='nav-avatar'
                                />
                                <span>Logout</span>
                            </div>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
    }
}

export default connect(({authedUser, users}) => ({authedUser,users,user: users[authedUser]}))(Navigation)