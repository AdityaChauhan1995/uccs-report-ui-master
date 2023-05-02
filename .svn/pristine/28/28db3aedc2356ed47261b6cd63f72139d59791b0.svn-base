// request related actions
import axios from 'axios';
const CREATE_REQUEST_API_URL = (sessionId, reportId) => `${process.env.REACT_APP_API_BASE}/request?sessionId=${sessionId}&reportId=${reportId}`
const GET_REQUEST_API_URL = (sessionId) => `${process.env.REACT_APP_API_BASE}/request?sessionId=${sessionId}`;
const FILE_UPLOAD_API_URL = (sessionId) => `${process.env.REACT_APP_API_BASE}/request/fileupload?sessionId=${sessionId}`;
const FILE_DOWNLOAD_API_URL = (sessionId, downloadUrl) => `${process.env.REACT_APP_API_BASE}/request/filedownload?sessionId=${sessionId}&downloadUrl=${downloadUrl}`;
var getRequests = (sessionId) => {

    return axios.get(GET_REQUEST_API_URL(sessionId));

}

var createRequest = (sessionId, reportId, inputs, outputs) => {


    return axios.post(CREATE_REQUEST_API_URL(sessionId, reportId), {
        inputs: inputs,
        output: outputs

    });
}

var setReportId = (reportId, reportName) => {
    return new Promise((resolve, reject) => {
        // call api and either return resolve o/**/r reject
        resolve({ reportId: reportId, reportName: reportName });
    })
}

var addInputs = (inputs) => {
    return new Promise((resolve, reject) => {
     
        // call api and either return resolve o/**/r reject
        resolve({ inputs: inputs });
    })
}

var addOutputs = (outputs) => {
    return new Promise((resolve, reject) => {
        // call api and either return resolve o/**/r reject
        resolve({ outputs: outputs });
    })
}

var FileUpload = (sessionId, formdata) => {

    return axios.post(FILE_UPLOAD_API_URL(sessionId), formdata);
}

var downloadFile = (sessionId, downloadUrl) => {

    return axios.get(FILE_DOWNLOAD_API_URL(sessionId, downloadUrl));
}
//action creaters
export const doGetRequests = (sessionId) => {
    return dispatch => {
        dispatch({
            type: 'GET_REQUEST',
            payload: getRequests(sessionId)
        })
    }
}

export const doSetReportId = (reportId, reportName) => {
    return dispatch => {
        dispatch({
            type: 'SET_REPORT_ID',
            payload: setReportId(reportId, reportName)
        })
    }
}

export const doAddInputs = (reportId, inputs) => {

    return dispatch => {
        dispatch({
            type: 'SET_REPORT_INPUT',
            payload: addInputs(inputs)
        })
    }
}

export const doAddOutputs = (reportId, outputs) => {
    return dispatch => {
        dispatch({
            type: 'SET_REPORT_OUTPUT',
            payload: addOutputs(outputs)
        })
    }
}

export const doCreateRequest = (sessionId, reportId, inputs, outputs) => {
    return dispatch => {
        dispatch({
            type: 'CREATE_REQUEST',
            payload: createRequest(sessionId, reportId, inputs, outputs)
        })
    }
}

export const doFileUpload = (sessionId, formdata) => {
    return dispatch => dispatch({
        type: 'FILE_UPLOAD',
        payload: FileUpload(sessionId, formdata)
    })
}


export const doFileDownload = (sessionId, downloadUrl) => {

    return dispatch => dispatch({
        type: 'FILE_DOWNLOAD',
        payload: downloadFile(sessionId, downloadUrl)
    })

}