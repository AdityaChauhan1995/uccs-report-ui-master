import axios from 'axios';
const LOGIN_API_URL = `${process.env.REACT_APP_API_BASE}/user/login`;
const LOGOUT_API_URL = (sessionId) => `${process.env.REACT_APP_API_BASE}/user/logout?sessionId=${sessionId}`;

// actions
var login = (email, password) => {
	return axios.post(LOGIN_API_URL, {
		email: email,
		password: password
	});
	

}

var logout = (sessionId) => {
	return axios.get(LOGOUT_API_URL(sessionId));
}

// action creators
export const doLogin = (email, password) => {
	return dispatch => {
		dispatch({
			type: 'LOGIN',
			payload: login(email, password)
		})

	}
}

// action creators
export const doLogout = (sessionId) => {
	return dispatch => {
		dispatch({
			type: 'LOGOUT',
			payload: logout(sessionId)
		})

	}
}

