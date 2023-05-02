import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './user';
import requestReducer from './request';
import reportReducer from './report';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  request: requestReducer,
  report: reportReducer,
});



/*
redux state
{
	user: {
		meta: {
			loginStatus: DEFAULT, PENDING, SUCCESS, FAILURE,
			logoutStatus: DEFAULT, PENDING, SUCCESS, FAILURE,
		}, 
		data: {
			sessionId: '',
			name: '',			
		}
	},
	request: {
		meta: {
			fetchStatus: DEFAULT, PENDING, SUCCESS, FAILURE,
			createStatus: DEFAULT, PENDING, SUCCESS, FAILURE,
		}, 
		data: {
			requests: 
			[
				{
					status: PENDING, READY,
					id: '',
					name: '',
					type: '',
					start: '',
					end: '',
					estimatedDuration: '',
					url: '',
				}
			]
		}	
	},
	report: {
		meta: {
			fetchStatus: DEFAULT, PENDING, SUCCESS, FAILURE,
		}, 
		data: {
			reports: [
				{
					id: '',
					name: '',
					type: '',
					frequency: '',
					lastRun: '',
					days2NextRun: '',
					estimatedDuration: '',
					url: '',
					inputs: [
						{
							columnName: "",
							operator: "",
							allowedValues: [],
							allowMultiple: true,
							allowFile: true,
						}
					],
					outputs: [
						{
							"seq": 1,	
							"columnName": "",
						}
					]
				}
			],
			inputColumns: [
				{key: 1, text: "columnName", value: "columnName"}
			],
			inputColumnsMeta: [
				{
					columnName": "",
					allowedOperators": [
						{key: 1, text: "Equals", value: "Equals},
					],
					allowedValues": [
						{key: 1, text: "P1", value: "P1},
					],
					allowFile: true,
					allowMultiple: true,
				}
			],
			outputColumns: [
				{key: 1, text: "columnName", value: "columnName"}
			]
		}
	}
}
*/