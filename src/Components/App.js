import React, { Component, Fragment} from 'react';
import { BrowserRouter  as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Login from './Login'
import Home from './Home';
import AddQuestion from './AddQuestion';
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Error404 from './Error404'
import Private from './Private'

class App extends Component {
	componentDidMount() {
	this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
			<Fragment>
        		<div className='container'>
					<Navigation />
					<Route path="/" exact component={Login}/>
					<Private path='/home' exact component={Home} />
					<Private path='/add' exact component={AddQuestion} />
					<Private path='/question/:id' component={QuestionPage} />
					<Private path='/leaderboard' component={Leaderboard} />
					<Route path="/Error404" component={Error404} />
				</div>
			</Fragment>
			</Router>
		)
	}
}

export default connect()(App);
