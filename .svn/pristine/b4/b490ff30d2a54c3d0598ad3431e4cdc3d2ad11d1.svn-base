import { combineReducers } from 'redux';
import {
	GET_REPORTS_FULFILLED,
	GET_REPORTS_REJECTED,
	GET_REPORTS_PENDING,
	GET_ADHOC_REPORT_INPUT_REJECTED,
	GET_ADHOC_REPORT_INPUT_PENDING,
	GET_ADHOC_REPORT_INPUT_FULFILLED,
	GET_ADHOC_REPORT_OUTPUT_FULFILLED,
	GET_ADHOC_REPORT_OUTPUT_PENDING,
	GET_ADHOC_REPORT_OUTPUT_REJECTED,
	GET_SCHEDULED_REPORT_REJECTED,
	GET_SCHEDULED_REPORT_FULFILLED,
	GET_SCHEDULED_REPORT_PENDING,
	LOGOUT_FULFILLED
} from '../actions/ActionTypes'

const initialMetaState = {
	GET_REPORT_STATUS: 'DEFAULT',
	GET_ADHOC_REPORT_INPUT_STATUS: 'DEFAULT',
	GET_ADHOC_REPORT_OUTPUT_STATUS: 'DEFAULT',
	GET_SCHEDULED_REPORT_STATUS:'DEFAULT'
}

const initialDataState = {
	reports: [],
	adhocinputs: [],
	adhocoutputs: [],
	scheduledReports: []
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_REPORTS_PENDING:
			return { ...state, GET_REPORT_STATUS: 'PENDING' }
		case GET_REPORTS_FULFILLED:
			return { ...state, GET_REPORT_STATUS: 'SUCCESS' }
		case GET_REPORTS_REJECTED:
			return { ...state, GET_REPORT_STATUS: 'FAILED' }
		case GET_ADHOC_REPORT_INPUT_PENDING:
			return { ...state, GET_ADHOC_REPORT_INPUT_STATUS: 'PENDING' }
		case GET_ADHOC_REPORT_INPUT_FULFILLED:
			return { ...state, GET_ADHOC_REPORT_INPUT_STATUS: 'SUCCESS' }
		case GET_ADHOC_REPORT_INPUT_REJECTED:
			return { ...state, GET_ADHOC_REPORT_INPUT_STATUS: 'FAILED' }
		case GET_ADHOC_REPORT_OUTPUT_PENDING:
			return { ...state, GET_ADHOC_REPORT_OUTPUT_STATUS: 'PENDING' }
		case GET_ADHOC_REPORT_OUTPUT_FULFILLED:
			return { ...state, GET_ADHOC_REPORT_OUTPUT_STATUS: 'SUCCESS' }
		case GET_ADHOC_REPORT_OUTPUT_REJECTED:
			return { ...state, GET_ADHOC_REPORT_OUTPUT_STATUS: 'FAILED' }
		case GET_SCHEDULED_REPORT_PENDING:
				return { ...state, GET_SCHEDULED_REPORT_STATUS: 'PENDING' }
		case GET_SCHEDULED_REPORT_FULFILLED:
				return { ...state, GET_SCHEDULED_REPORT_STATUS: 'SUCCESS' }
		case GET_SCHEDULED_REPORT_REJECTED:
				return { ...state, GET_SCHEDULED_REPORT_STATUS: 'FAILED' }
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_REPORTS_FULFILLED:
			{
				return { ...state, reports: action.payload.data.response.data }
			}
		case GET_ADHOC_REPORT_INPUT_FULFILLED:
			{
				return { ...state, adhocinputs: action.payload.data.response }
			}
		case GET_ADHOC_REPORT_INPUT_REJECTED:
			{
				return { ...state, adhocinputs: [] }
			}
		case GET_ADHOC_REPORT_OUTPUT_FULFILLED:
			{

				return { ...state, adhocoutputs: action.payload.data.response.columns }
			}
		case GET_ADHOC_REPORT_OUTPUT_REJECTED:
			{
				return { ...state, adhocoutputs: [] }
			}
		case GET_SCHEDULED_REPORT_FULFILLED:
			{
				return { ...state, scheduledReports: action.payload.data.response }
			}
		case GET_SCHEDULED_REPORT_REJECTED:
			{
				return { ...state, scheduledReports: [] }
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