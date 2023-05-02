// report related actions
import axios from 'axios';
const GET_REPORTS_API_URL = (sessionId) => `${process.env.REACT_APP_API_BASE}/report/?sessionId=${sessionId}`;
const GET_ADHOC_REPORT_INPUT_API_URL = (sessionId, reportId) => `${process.env.REACT_APP_API_BASE}/report/adhoc-report-input?sessionId=${sessionId}&reportId=${reportId}`
const GET_ADHOC_REPORT_OUTPUT_API_URL = (sessionId, reportId) => `${process.env.REACT_APP_API_BASE}/report/adhoc-report-output?sessionId=${sessionId}&reportId=${reportId}`
const GET_SCHEDULED_REPORT_API_URL = (sessionId, reportType) =>  `${process.env.REACT_APP_API_BASE}/report/scheduled-report?sessionId=${sessionId}&reportType=${reportType}`
//get reports list
var getReports = (sessionId) => {
    return axios.get(GET_REPORTS_API_URL(sessionId));   
}

//get input columns list for reports
var getAdhocReportInput = (sessionId, reportId) => {
    console.log(reportId);
    return axios.get(GET_ADHOC_REPORT_INPUT_API_URL(sessionId, reportId)); 
}

//get output column list for Adhoc columns
var getAdhocReportOutput = (sessionId, reportId) => {
    return axios.get(GET_ADHOC_REPORT_OUTPUT_API_URL(sessionId, reportId));
   
}

//action creators
export const doGetReports = (sessionId) => {
    return dispatch => dispatch({
        type: 'GET_REPORTS',
        payload: getReports(sessionId)
    });
}


export const doGetAdhocReportInput = (sessionId, reportId) => {
    return dispatch => dispatch({
        type: "GET_ADHOC_REPORT_INPUT",
        payload: getAdhocReportInput(sessionId, reportId)
    })
}

export const doGetAdhocReportOutput = (sessionId, reportId) => {
    return dispatch => dispatch({
        type: 'GET_ADHOC_REPORT_OUTPUT',
        payload: getAdhocReportOutput(sessionId, reportId)
    })
}

var _getScheduledReport = (sessionId, reportType) => {
    console.log('GET_SCHEDULED_REPORT_API_URL',GET_SCHEDULED_REPORT_API_URL(sessionId, reportType));
    return axios.get(GET_SCHEDULED_REPORT_API_URL(sessionId, reportType)); 
}

export const getScheduledReport = (sessionId, reportType) => {
    return dispatch => dispatch({
        type: "GET_SCHEDULED_REPORT",
        payload: _getScheduledReport(sessionId, reportType)
    })
}