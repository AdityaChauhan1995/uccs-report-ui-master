import React, { Component } from 'react';
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import { Container, Segment, Grid, Button, Header, Icon, Input } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { doSetReportId, doFileDownload } from '../actions/RequestActions';
import { doGetAdhocReportInput } from '../actions/ReportActions'

export class AdhocReportSelection extends Component {

	constructor(props) {
		super(props);

		let adhocReports = props.reports.filter(r => r.type === "Adhoc Report")
		this.state = {
			reports: adhocReports,
			filteredReports: adhocReports,
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			}
		};
	}

	reportSearch = (value) => {
		this.setState({
			filteredReports: this.state.reports.filter((x) => {
				return x.name.toLowerCase().match(value.toLowerCase())
			})
		});
	}
	downloadFile(downloadUrl) {
		console.log(downloadUrl)
		this.setState({
			downloadedFile: { ...this.state.downloadedFile, fileName: downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1) } //assuming filepath to be /downloads/fileName
		});

		this.props.doFileDownload(this.props.sessionId, downloadUrl);
	}
	requestReport(reportId, reportName) {
		this.props.doSetReportId(reportId, reportName);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.SET_REPORT_ID_STATUS !== 'SUCCESS' &&
			nextProps.SET_REPORT_ID_STATUS === 'SUCCESS') {
			// get report parameters
			const { sessionId, reportId } = nextProps;
			this.props.doGetAdhocReportInput(sessionId, reportId);
		}
		else if (this.props.GET_ADHOC_REPORT_INPUT_STATUS !== 'SUCCESS' &&
			nextProps.GET_ADHOC_REPORT_INPUT_STATUS === "SUCCESS") {
			this.props.history.push('/adhoc-report-input');
		}
		else if (this.props.GET_ADHOC_REPORT_INPUT_STATUS !== 'FAILED' &&
			nextProps.GET_ADHOC_REPORT_INPUT_STATUS === "FAILED") {
			this.props.history.push('/adhoc-report-input');
		}
		if (nextProps.FILE_DOWNLOAD_STATUS === 'SUCCESS' && this.props.FILE_DOWNLOAD_STATUS !== 'SUCCESS') {

			const url = window.URL.createObjectURL(new Blob([nextProps.file]))
			this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } },
				() => this.state.downloadedFile.ref.current.click());

		}
	}

	render() {
		let { filteredReports } = this.state;
		return (
			<Container fluid className='container'>
				<NavBar index={1}
					reset={() => this.props.history.replace('/')}
					navigate={(location) => this.props.history.push(location)}
				/>
				<Grid style={{ padding: '5px 15px', margin: 0, height: 50 }}>
					<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
						<Grid.Column width={12} style={{ margin: 0, padding: 0 }}>
							<Button.Group basic>
								<Button toggle onClick={() => this.props.history.push('/standard-report-selection')}>STANDARD</Button>
								<Button toggle active>ADHOC</Button>
							</Button.Group>
						</Grid.Column>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Input icon placeholder='Search for a report'
								fluid
								onChange={(e) => { this.reportSearch(e.target.value) }}>
								<input />
								<Icon name='search' />
							</Input>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Segment basic className='content' style={{ paddingTop: 0, marginTop: 0, minHeight: 460 }}>

					<Grid style={{ margin: 0, padding: 0 }}>
						{
							filteredReports.map((value) => {
								return (
									<Grid.Row key={value.name} style={{ alignItems: 'center' }}>
										<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
											<Header as='h5'>{value.name}</Header>
										</Grid.Column>
										<Grid.Column width={8} style={{ margin: 0, padding: 0 }}>
											<Icon className='stopwatch' size='large' color='grey' />
											{value.estimatedDuration}
										</Grid.Column>
										<Grid.Column width={2} style={{ margin: 0, padding: 0 }}>
											{
												(value.downloadUrl !== '' && value.downloadUrl !== undefined) &&

												<Button style={{ width: 120 }} primary onClick={() => this.downloadFile(value.downloadUrl)}>DOWNLOAD</Button>

											}
											{
												(value.downloadUrl === '' || value.downloadUrl === undefined) &&
												<Button basic
													style={{ width: 120 }}
													onClick={() => this.requestReport(value._id, value.name)}>
													REQUEST
											</Button>

											}
										</Grid.Column>
									</Grid.Row>
								)
							}
							)
						}
					</Grid>
				</Segment>
				<a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
				<Footer />
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sessionId: state.user.data.sessionId,
		reportId: state.request.data.request.reportId,
		reports: state.report.data.reports,
		file: state.request.data.file,
		GET_ADHOC_REPORT_INPUT_STATUS: state.report.meta.GET_ADHOC_REPORT_INPUT_STATUS,
		SET_REPORT_ID_STATUS: state.request.meta.SET_REPORT_ID_STATUS,
		FILE_DOWNLOAD_STATUS: state.request.meta.FILE_DOWNLOAD_STATUS,
	}
}

const mapDispatchToProps = {
	doSetReportId,
	doGetAdhocReportInput,
	doFileDownload
}

export default connect(mapStateToProps, mapDispatchToProps)(AdhocReportSelection);
