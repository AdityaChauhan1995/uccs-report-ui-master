import React from "react";
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history } from '../store';
import LoginScreen from '../pages/login-screen';
import StandardReportInput from '../pages/standard-report-input';
import AdhocReportInput from '../pages/adhoc-report-input';
import AdhocReportOutput from '../pages/adhoc-report-output';
import RequestSubmitted from '../pages/request-submitted';
import MyRequests from '../pages/my-requests';
import StandardReportSelection from '../pages/standard-report-selection';
import AdhocReportSelection from '../pages/adhoc-report-selection';
import ScheduledReport from '../pages/scheduled-report';


const routes = (
    <Router history={history}>
        <div style={{minHeight: 600, height: '100vh'}}>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/my-requests" component={MyRequests} />
            <Route exact path="/standard-report-selection" component={StandardReportSelection} />
            <Route exact path="/adhoc-report-selection" component={AdhocReportSelection} />
            <Route exact path="/request-submitted" component={RequestSubmitted} />
            <Route exact path="/adhoc-report-output" component={AdhocReportOutput} />
            <Route exact path="/adhoc-report-input" component={AdhocReportInput} />
            <Route exact path="/standard-report-input" component={StandardReportInput} />
            <Route exact path="/scheduled-report" component={ScheduledReport} />
        </div>
    </Router>
)

export default routes
