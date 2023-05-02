import React, { Component } from "react";
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import { Container, Segment, Grid, Button, Header, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { doGetAdhocReportOutput, } from '../actions/ReportActions';
import { doAddOutputs, doCreateRequest } from "../actions/RequestActions";
import LoadingDimmer from "../components/loading-dimmer";

class AdhocReportOutput extends Component {

	constructor(props) {
		super(props);
		let selectedReport = this.props.reports.find(r => r._id === props.reportId);

		this.state = {
			globalColumnList: [],
			finalColumnList: selectedReport.outputs.sort((col1, col2) => {
				return col1.seq - col2.seq
			}),
			globalSearchColumnsTemp: [],
			finalColumnTemp: selectedReport.outputs,
			finalColumnCounter: 0,
			finalColumnListSize: 5,
			filterAddColumnList: null,
			filterFinalColumnList: null,
			allAdhocColumns: [],
			loading: false
		};

	}
	componentDidMount() {
		//pass sessionId, reportId
		this.props.doGetAdhocReportOutput(this.props.sessionId, this.props.reportId);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.GET_ADHOC_REPORT_OUTPUT_STATUS !== 'SUCCESS' &&
			nextProps.GET_ADHOC_REPORT_OUTPUT_STATUS === "SUCCESS") {

			this.setState({
				globalSearchColumnsTemp: nextProps.globalColumnList,
				globalColumnList: nextProps.globalColumnList
			});
		}
		else if (this.props.SET_REPORT_OUTPUT_STATUS !== 'SUCCESS' &&
			nextProps.SET_REPORT_OUTPUT_STATUS === "SUCCESS") {
			const {sessionId, reportId} = this.props;
			const { finalColumnList } = this.state;
			let inputs = this.props.request.inputs
			this.setState({
				loading: true
			}, () => {
				this.props.doCreateRequest(sessionId, reportId, inputs, finalColumnList)
			})

		}
		else if (this.props.CREATE_REQUEST_STATUS !== 'SUCCESS' &&
			nextProps.CREATE_REQUEST_STATUS === 'SUCCESS') {
			this.setState({
				loading: false
			})
			this.props.history.push('/request-submitted');
		}
		else if (nextProps.CREATE_REQUEST_STATUS === 'FAILED' || nextProps.CREATE_REQUEST_STATUS === 'REJECTED') {
			this.setState({
				loading: false
			})
		}
	}

	removeColumn(column) {
		const { finalColumnList, globalColumnList, globalSearchColumnsTemp, finalColumnTemp, filterFinalColumnList } = this.state;
		if (filterFinalColumnList != null && filterFinalColumnList.length > 0) {
			this.setState({
				finalColumnList: finalColumnList.filter((x) => {
					return x.columnName !== column.columnName
				}),
				globalColumnList: [
					...globalColumnList,
					column
				],
				globalSearchColumnsTemp: [
					...globalSearchColumnsTemp,
					column
				],
				finalColumnTemp: finalColumnTemp.filter((x) => {
					return x.columnName !== column.columnName
				}),
				globalColumnColunter: 1
			});
		}
		else {
			this.setState({
				finalColumnList: finalColumnList.filter((x) => {
					return x.columnName !== column.columnName
				}),
				globalColumnList: [
					...globalSearchColumnsTemp,
					column
				],
				globalSearchColumnsTemp: [
					...globalSearchColumnsTemp,
					column
				],
				globalColumnColunter: 1
			});
		}
	}
	moveColumns(column, index, action) {
		let { finalColumnList } = this.state;
		let tempObject = null;
		console.log(column.seq)

		if (action === 'move_up') {
			//update col sequence for columns in final list

			if (index > 0) {
				column.seq = column.seq - 1
				tempObject = finalColumnList[index - 1];
				finalColumnList[index - 1] = column;
				finalColumnList[index] = tempObject;
			}
		}
		else if (action === 'move_down') {
			if (index < finalColumnList.length - 1) {
				column.seq = column.seq + 1
				tempObject = finalColumnList[index + 1];
				finalColumnList[index + 1] = column;
				finalColumnList[index] = tempObject;
			}
		}
		this.setState({
			finalColumnList: [...finalColumnList]
		})
		console.log(column.seq);
	}
	addColumn(column) {
		const { finalColumnList, globalColumnList, globalSearchColumnsTemp, filterAddColumnList, finalColumnTemp } = this.state;
		if (filterAddColumnList != null && filterAddColumnList.length > 0) {
			this.setState({
				globalColumnList: globalColumnList.filter((x) => {
					return x.columnName !== column.columnName
				}),
				finalColumnList: [
					...finalColumnList,
					column
				],
				globalSearchColumnsTemp: globalSearchColumnsTemp.filter((x) => {
					return x.columnName !== column.columnName
				}),
				finalColumnTemp: [
					...finalColumnTemp,
					column
				]
			});
		}
		else {
			let tempColumns = globalSearchColumnsTemp.filter((x) => {
				return x.columnName !== column.columnName
			});
			this.setState({
				globalColumnList: tempColumns,
				finalColumnList: [
					...finalColumnList,
					column
				],
				globalSearchColumnsTemp: tempColumns,
				finalColumnTemp: [
					...finalColumnTemp,
					column
				]
			});
		}
	}
	globalColumnSearch = (event) => {
		const { globalSearchColumnsTemp } = this.state;
		this.setState({
			globalColumnList: globalSearchColumnsTemp.filter((x) => {
				return x.columnName.toLowerCase().match(event.target.value.toLowerCase())
			}),
			filterAddColumnList: event.target.value
		});

	}
	finalColumnSearch = (event) => {
		const { finalColumnTemp } = this.state;

		this.setState({
			finalColumnList: finalColumnTemp.filter((x) => {
				return x.columnName.toLowerCase().match(event.target.value.toLowerCase())
			}),
			filterFinalColumnList: event.target.value
		});
	}

	next = () => {
		const { reportId } = this.props;

		this.props.doAddOutputs(reportId, this.state.finalColumnList);
	}

	render() {
		let { globalColumnList, finalColumnList } = this.state;
        console.log("globalcolumnlist",globalColumnList);
		console.log("finalColList", finalColumnList); 
		return (
			<Container fluid className='container'>
				<NavBar index={1}
					reset={() => this.props.history.replace('/')}
					navigate={(location) => this.props.history.push(location)}
					/>
				<Grid style={{ padding: '5px 15px', margin: 0 }}>
					<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
						<Grid.Column width={12} style={{ margin: 0, padding: 0 }}>
							<Button.Group basic>
								<Button toggle active onClick={() => this.props.history.push('/standard-report-selection')}>STANDARD</Button>
								<Button toggle onClick={() => this.props.history.push('/adhoc-report-selection')}>ADHOC</Button>
							</Button.Group>
						</Grid.Column>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Header as='h4' textAlign='right'>
								Adhoc Report (Output Criteria)
								</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Segment basic className='content' style={{ height: 410 }}>
					<Grid style={{ margin: 0, padding: 0 }}>
						<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
							<Grid.Column width={4} style={{ margin: 0, padding: 5 }}>
								<Header as='h5'>Add Columns ({globalColumnList.length}) </Header>
							</Grid.Column>
							<Grid.Column width={4} ></Grid.Column>
							<Grid.Column width={4} style={{ margin: 0, padding: 5 }}>
								<Header as='h5'>Final Output Columns ({finalColumnList.length})</Header>
							</Grid.Column>
							<Grid.Column width={4}></Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
							<Grid.Column width={4} style={{ margin: 0, padding: 5 }}>
								<Input icon placeholder='Find a column' fluid onChange={(e) => { this.globalColumnSearch(e) } }>
									<input />
									<Icon name='search' link />
								</Input>
							</Grid.Column>
							<Grid.Column width={4}></Grid.Column>
							<Grid.Column width={4} style={{ margin: 0, padding: 5 }}>
								<Input icon placeholder='Find a column' fluid onChange={(e) => { this.finalColumnSearch(e) } }>
									<input />
									<Icon name='search' link />
								</Input>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ margin: 0, padding: 0, alignItems: 'center' }}>
							<Grid.Column width={4} style={{
								margin: 0, padding: 5,
								height: 300, overflowY: 'auto'
							}}>
								{globalColumnList.map((column, i) => {
									
									return (
										<Segment
											key={column.columnName}
											style={{
												padding: 8, marginLeft: 0,
												marginBottom: 5,
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												fontSize: 13,
											}}>
											{column.columnName}
											<Icon name='add circle'
												size='large'
												style={{ color: '#293895' }}
												link
												onClick={() => this.addColumn(column)} />
										</Segment>
									)
								}
								)
								}
							</Grid.Column>
							<Grid.Column width={4} style={{ margin: 0, padding: 0 }} />
							<Grid.Column width={6} style={{
								margin: 0, padding: 5,
								height: 300, overflowY: 'auto'
							}}>
								{finalColumnList.map((column, i) => {
									return (
										<Segment
											key={column.columnName}
											basic
											style={{
												padding: 0, marginLeft: 0,
												marginBottom: 5,
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												fontSize: 13,
											}}>
											<Segment style={{
												flex: 0.925,
												padding: 8,
												margin: 0,
												marginRight: 5,
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												fontSize: 13,
											}}>
												{column.columnName}
												<Icon name='minus circle'
													size='large'
													style={{ color: '#E14040' }}
													link
													onClick={() => this.removeColumn(column)} />
											</Segment>
											<Button.Group basic style={{ height: 37.5, position: 'relative', left: '-22px' }}>
												<Button toggle active onClick={() => this.moveColumns(column, i, 'move_down')}>DOWN</Button>
												<Button toggle onClick={() => this.moveColumns(column, i, 'move_up')}>UP</Button>
											</Button.Group>
										</Segment>
									)
								}
								)
								}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, minWidth: 900, minHeight: 35 }}>
					<Button basic onClick={() => this.props.history.goBack()}>BACK</Button>
					<Button primary onClick={this.next}>NEXT</Button>
				</Segment>
				<LoadingDimmer active={this.state.loading} />
				<Footer />
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		globalColumnList: state.report.data.adhocoutputs,
		GET_ADHOC_REPORT_OUTPUT_STATUS: state.report.meta.GET_ADHOC_REPORT_OUTPUT_STATUS,
		SET_REPORT_OUTPUT_STATUS: state.request.meta.SET_REPORT_OUTPUT_STATUS,
		reports: state.report.data.reports,
		sessionId: state.user.data.sessionId,
		reportId: state.request.data.request.reportId,
		request: state.request.data.request,
		CREATE_REQUEST_STATUS: state.request.meta.CREATE_REQUEST_STATUS,
	}
}
const mapDispatchToProps = {
	doGetAdhocReportOutput,
	doAddOutputs,
	doCreateRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(AdhocReportOutput);