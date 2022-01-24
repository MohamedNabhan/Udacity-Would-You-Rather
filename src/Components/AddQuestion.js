import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from  '../actions/questions'

class AddQuestion extends Component {	
	state = {
		redirect: false,      
    	optionOneText:'',
		optionTwoText:'',
	};
	handleInput = (e, type) => {
		this.setState((state) => {
			return type === 'poll1' ? {...state, optionOneText: e} : {...state, optionTwoText: e}
		});
	}
	handleSubmit = (e) => {   
    	e.preventDefault();
    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    	dispatch(handleAddQuestion(
      		optionOneText,
      		optionTwoText
    	))
    	this.setState({
			redirect: true,
        	optionOneText:'',
			optionTwoText:'',
      	})
		  
  	}
 
	render() {
		if (this.state.redirect) {
			return <Redirect to='/home' />
		}
		return (
			<div className='add-question'>
				<h1 className="mark-poll">Add New Question</h1>
				<div className="card-list">
					<div className='card ask'>
						<h2 className="mark-poll">Would you rather...</h2>
							<form onSubmit={this.handleSubmit}>
						<div className="would-you">Would you rather...</div>
						<input 
							name="optionOneText"
							type="text"
							placeholder="Enter Option One Text Here"
							value={this.state.optionOneText}
							onChange={(e) => this.handleInput(e.target.value, 'poll1')} />
						<div className="or">Or</div>
						<input 
							name="optionTwoText"
							type="text"
							placeholder="Enter Option Two Text Here"
							value={this.state.optionTwoText}
							onChange={(e) => this.handleInput(e.target.value, 'poll2')} />
						<button type="submit" className="mark-poll">Submit</button>
					</form>
					</div>
				</div>
			</div>
  		)
	}
}

export default connect()(AddQuestion);