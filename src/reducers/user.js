import { combineReducers } from 'redux';
import {
	LOGIN_PENDING,
	LOGIN_FULFILLED,
	LOGIN_REJECTED,
	LOGOUT_PENDING,
	LOGOUT_FULFILLED,
	LOGOUT_REJECTED
} from '../actions/ActionTypes';

const initialMetaState = {
	LOGIN_STATUS: 'DEFAULT',
	LOGOUT_STATUS: 'DEFAULT',
}

const initialDataState = {
	sessionId: '',
	name: '',
}

function metaReducer(state=initialMetaState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		case LOGIN_PENDING: 
		
			return {...state, LOGIN_STATUS: 'PENDING', LOGOUT_STATUS: 'DEFAULT'}
		case LOGIN_FULFILLED:
			return {...state, LOGIN_STATUS: 'SUCCESS'}
		case LOGIN_REJECTED:
			return {...state, LOGIN_STATUS: 'FAILED'}
		case LOGOUT_PENDING: 
			return {...state, LOGOUT_STATUS: 'PENDING', LOGIN_STATUS: 'DEFAULT'}
		case LOGOUT_FULFILLED:
			return {...state, LOGOUT_STATUS: 'SUCCESS', LOGIN_STATUS: 'DEFAULT'}
		case LOGOUT_REJECTED:
			return {...state, LOGOUT_STATUS: 'FAILED'}	
		default:
			return state;	
	}
}

function dataReducer(state=initialDataState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		case LOGIN_FULFILLED:
		{ console.log(action.payload.data.response);
			return {
				...state, 
				...action.payload.data.response
			}
		}
		case LOGOUT_FULFILLED:
			return {...state, 
				sessionId: '',
				name: ''
			}			
		default:
			return state;	
	}
}

export default combineReducers({
  meta: metaReducer,
  data: dataReducer
});