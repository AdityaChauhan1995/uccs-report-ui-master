import { combineReducers } from 'redux';
import {
	GET_REQUEST_REJECTED,
	GET_REQUEST_PENDING,
	GET_REQUEST_FULFILLED,
	CREATE_REQUEST_FULFILLED,
	CREATE_REQUEST_PENDING,
	CREATE_REQUEST_REJECTED,
	SET_REPORT_INPUT_PENDING,
	SET_REPORT_INPUT_FULFILLED,
	SET_REPORT_OUTPUT_PENDING,
	SET_REPORT_OUTPUT_FULFILLED,
	LOGOUT_FULFILLED,
	SET_REPORT_ID_PENDING,
	SET_REPORT_ID_FULFILLED,
	FILE_UPLOAD_PENDING,
	FILE_UPLOAD_REJECTED,
	FILE_UPLOAD_FULFILLED,
	FILE_DOWNLOAD_PENDING,
	FILE_DOWNLOAD_FULFILLED,
	FILE_DOWNLOAD_REJECTED
} from '../actions/ActionTypes'

const initialMetaState = {
	GET_REQUEST_STATUS: 'DEFAULT',
	CREATE_REQUEST_STATUS: 'DEFAULT',
	SET_REPORT_ID_STATUS: 'DEFAULT',
	SET_REPORT_INPUT_STATUS: 'DEFAULT',
	SET_REPORT_OUTPUT_STATUS: 'DEFAULT',
	FILE_UPLOAD_STATUS: 'DEFAULT',
	FILE_DOWNLOAD_STATUS:'DEFAULT'
}

const initialDataState = {
	request: {
		reportId: '',
		inputs: [],
		outputs: [],
	},
	myrequests: [],
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_REQUEST_PENDING:
			return { ...state, GET_REQUEST_STATUS: 'PENDING' }
		case GET_REQUEST_FULFILLED:
			return { ...state, GET_REQUEST_STATUS: 'SUCCESS' }
		case GET_REQUEST_REJECTED:
			return { ...state, GET_REQUEST_STATUS: 'FAILED' }
		case CREATE_REQUEST_PENDING:
			return { ...state, CREATE_REQUEST_STATUS: 'PENDING' }
		case CREATE_REQUEST_FULFILLED:
			return { ...state, CREATE_REQUEST_STATUS: 'SUCCESS' }
		case CREATE_REQUEST_REJECTED:
			return { ...state, CREATE_REQUEST_REJECTED: 'REJECTED' }
		case SET_REPORT_ID_PENDING:
			return { ...state, SET_REPORT_ID_STATUS: 'PENDING' }
		case SET_REPORT_ID_FULFILLED:
			return { ...state, SET_REPORT_ID_STATUS: 'SUCCESS' }
		case SET_REPORT_INPUT_PENDING:
			return { ...state, SET_REPORT_INPUT_STATUS: 'PENDING' }
		case SET_REPORT_INPUT_FULFILLED:
			return { ...state, SET_REPORT_INPUT_STATUS: 'SUCCESS' }
		case SET_REPORT_OUTPUT_PENDING:
			return { ...state, SET_REPORT_OUTPUT_STATUS: 'PENDING' }
		case SET_REPORT_OUTPUT_FULFILLED:
			return { ...state, SET_REPORT_OUTPUT_STATUS: 'SUCCESS' }
		case FILE_UPLOAD_PENDING:
			return { ...state, FILE_UPLOAD_STATUS: 'PENDING' }
		case FILE_UPLOAD_FULFILLED:
			return { ...state, FILE_UPLOAD_STATUS: 'SUCCESS' }
		case FILE_UPLOAD_REJECTED:
			return { ...state, FILE_UPLOAD_STATUS: 'REJECTED' }
		case FILE_DOWNLOAD_PENDING:
			return { ...state, FILE_DOWNLOAD_STATUS: 'PENDING' }
		case FILE_DOWNLOAD_FULFILLED:
			return { ...state, FILE_DOWNLOAD_STATUS: 'SUCCESS' }
		case FILE_DOWNLOAD_REJECTED:
			return { ...state, FILE_DOWNLOAD_STATUS: 'REJECTED' }
		case LOGOUT_FULFILLED:
			return initialMetaState;
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	// listen to only the action interested for this reducer
	const {request} = state;
	switch (action.type) {
		case GET_REQUEST_FULFILLED:
			{
				return { ...state, myrequests: action.payload.data.response.requests }
			}
		case SET_REPORT_ID_FULFILLED:
			return { ...state, request: { ...request, reportId: action.payload.reportId, reportName: action.payload.reportName, inputs: [], outputs: [] } }
		case SET_REPORT_INPUT_FULFILLED:
			return { ...state, request: { ...request, inputs: action.payload.inputs } }
		case SET_REPORT_OUTPUT_FULFILLED:
			return { ...state, request: { ...request, outputs: action.payload.outputs } }
		case FILE_UPLOAD_FULFILLED:
			{
				return { ...state, fileData: action.payload.data }
			}
			case FILE_DOWNLOAD_FULFILLED:
			{ 
              return {...state, file:action.payload.data}
			}
			case FILE_DOWNLOAD_REJECTED:
			{
				return {...state, file:action.payload.data}
			}
		case LOGOUT_FULFILLED:
			return initialDataState;
		default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});