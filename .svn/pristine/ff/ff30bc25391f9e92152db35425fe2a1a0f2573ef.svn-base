import React, { Component } from 'react';
import NavBar from '../components/nav-bar';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getScheduledReport } from '../actions/ReportActions';

export class ScheduledReport extends Component {

	constructor(props) {
		super(props);
		this.state = {
			reports: null,
			filteredReports: null,
			scheduledReports:[]
			};
	}

	componentDidMount() {
		//pass sessionId, reportId
		this.props.getScheduledReport(this.props.sessionId, 'Scheduled Report');
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.GET_SCHEDULED_REPORT_STATUS !== 'SUCCESS' &&
			nextProps.GET_SCHEDULED_REPORT_STATUS === "SUCCESS") {
			console.log('scheduledReports', nextProps.scheduledReports.data);
			this.setState({
				scheduledReports: nextProps.scheduledReports.data
			});
		}
	}

	render() {
		let {scheduledReports} = this.state;
		const TableRow = ({ line }) => {
			const {name,frequency,days2NextRun,lastRun} = line;
			
			return (
				<Grid.Row style={{ alignItems: 'center', fontSize: 12, color: '#757678' }}>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Header as='h5'>{name}</Header>
						</Grid.Column>
						<Grid.Column width={2} style={{ margin: 0, padding: 0 }}>
							{frequency}
						</Grid.Column>
						<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
							{days2NextRun.substring(0,10)}
						</Grid.Column>
						<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
							{lastRun.substring(0,10)}
						</Grid.Column>
						<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
							Success
						</Grid.Column>										
				</Grid.Row>
			)
		}
		return (
			<Container fluid className='container'>

             <NavBar index={3}
                 reset={() => this.props.history.replace('/')}
                  navigate={(location) => this.props.history.push(location)}
                  />

               <Grid style={{ padding: '5px 15px', margin: 0, height: 50 }}>
					<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Header as='h3' >
							Scheduled Report 
							</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Segment basic className='content' style={{ paddingTop: 0, marginTop: 0, minHeight: 460 }}>
				<Grid style={{ margin: 0, padding: 0 }}>
									<Grid.Row style={{ alignItems: 'center', fontSize: 12, color: '#757678' }}>
										<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
											<Header as='h4'>REPORT NAME</Header>
										</Grid.Column>
										<Grid.Column width={2} style={{ margin: 0, padding: 0 }}>
										<Header as='h4'>FREQUENCY</Header>	 
										</Grid.Column>
										<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
										<Header as='h4'>NEXT RUN</Header>
										</Grid.Column>
										<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
										<Header as='h4'>LAST RUN</Header>	 
										</Grid.Column>
										<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
										<Header as='h4'>LAST RUN STATUS</Header>	 
										</Grid.Column>
										
									</Grid.Row>
					</Grid>
					<Grid style={{ margin: 0, padding: 0 }}>
					{(scheduledReports!=undefined && scheduledReports!==null && scheduledReports.length>0) &&
						<React.Fragment>
							{scheduledReports.map((line, key) => {
								return (
									<TableRow key={key} line={line}/>
								)
							})}
						</React.Fragment>
					}
					</Grid>
				</Segment>
			</Container>
);
	}
}
const mapStateToProps = (state) => {
	return {
		sessionId: state.user.data.sessionId,
		scheduledReports: state.report.data.scheduledReports,
		GET_SCHEDULED_REPORT_STATUS: state.report.meta.GET_SCHEDULED_REPORT_STATUS,
	}
}

const mapDispatchToProps = {
	getScheduledReport
}
export default connect(mapStateToProps, mapDispatchToProps)(ScheduledReport);
