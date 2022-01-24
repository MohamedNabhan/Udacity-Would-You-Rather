import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion({ id, author, timestamp,  optionOne, optionTwo }) {
    return {
        type: ADD_QUESTION,
        id,
        author,
        timestamp,
        optionOne,
        optionTwo,
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
      const { authedUser } = getState()
      dispatch(showLoading())
  
      return saveQuestion({
          optionOneText,
          optionTwoText,
        author: authedUser,
      })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
  }

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}
  
function addAnswer ({ qid, authedUser, answer }) {
    return {
        type: ADD_ANSWER,
        qid,
        authedUser,
        answer,
    }
}

export function handleAddAnswer (info) {
    return (dispatch) => {
      dispatch(addAnswer(info))
      return saveQuestionAnswer(info)
        .catch((e) => {
          console.warn('Error in handleAddAnswer: ', e)
          dispatch(addAnswer(info)) 
          alert('The was an error saving the answer. Try again.')
      })
    }
} 