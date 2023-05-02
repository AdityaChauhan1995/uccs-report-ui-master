import React, { Component } from 'react';
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import { Container, Segment, Grid, Button, Header, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { doSetReportId, doFileDownload } from '../actions/RequestActions';

export class StandardReportSelection extends Component {

	constructor(props) {
		super(props);

		let adhocReports = props.reports.filter(r => r.type === "Standard Report")
		this.state = {
			reports: adhocReports,
			filteredReports: adhocReports,
			downloadedFile: {
				ref: React.createRef(),
				url: null,
				fileName: null
			},
		};
	}
	
	downloadFile(downloadUrl) {
		console.log(downloadUrl)
		this.setState({
			downloadedFile: { ...this.state.downloadedFile, fileName:  downloadUrl.substring(downloadUrl.lastIndexOf('/')+1)} //assuming filepath to be /downloads/fileName
		});

		this.props.doFileDownload(this.props.sessionId, downloadUrl);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.SET_REPORT_ID_STATUS !== 'SUCCESS' && nextProps.SET_REPORT_ID_STATUS === 'SUCCESS') {
			// navigate to input selection
			this.props.history.push('/standard-report-input');
		}
		if (nextProps.FILE_DOWNLOAD_STATUS === 'SUCCESS' && this.props.FILE_DOWNLOAD_STATUS !== 'SUCCESS') {

			const url = window.URL.createObjectURL(new Blob([nextProps.file]))
			this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } },
				() => this.state.downloadedFile.ref.current.click());

		}
	}

	reportSearch = (value) => {
		const {reports} = this.state
		this.setState({
			filteredReports: reports.filter((x) => x.name.toLowerCase().match(value.toLowerCase()))
		})
	}

	requestReport(id, name) {
		this.props.doSetReportId(id, name);
	}
	render() {
		const { filteredReports } = this.state;
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
								<Button toggle active>STANDARD</Button>
								<Button toggle onClick={() => this.props.history.push('/adhoc-report-selection')}>ADHOC</Button>
							</Button.Group>
						</Grid.Column>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Input icon placeholder='Search for a report'
								fluid
								onChange={(e) => { this.reportSearch(e.target.value) } }>
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
									<Grid.Row key={value.name} style={{ alignItems: 'center', fontSize: 12, color: '#757678' }}>
										<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
											<Header as='h5'>{value.name}</Header>
										</Grid.Column>
										<Grid.Column width={2} style={{ margin: 0, padding: 0 }}>
											<Icon name='history' size='large' color='grey' />{value.frequency}
										</Grid.Column>
										<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
											<Icon name='clock outline' size='large' color='grey' />{value.lastRun}
										</Grid.Column>
										<Grid.Column width={3} style={{ margin: 0, padding: 0 }}>
											<Icon className='stopwatch' size='large' color='grey' />{value.estimatedDuration}
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
							})
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
		reports: state.report.data.reports,
		file: state.request.data.file,
		SET_REPORT_ID_STATUS: state.request.meta.SET_REPORT_ID_STATUS,
		FILE_DOWNLOAD_STATUS: state.request.meta.FILE_DOWNLOAD_STATUS,

	}
}

const mapDispatchToProps = {
	doSetReportId,
	doFileDownload
}
export default connect(mapStateToProps, mapDispatchToProps)(StandardReportSelection);
