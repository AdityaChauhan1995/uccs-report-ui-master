import React, { Component } from 'react';
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import { Container, Segment, Button, Header, Grid, Form } from 'semantic-ui-react';
import ReportInputMultiple from './report-input-multiple';
import DefaultInput from '../components/default-input';
import ErrorMessage from '../components/error-message';
import { connect } from 'react-redux';
import LoadingDimmer from "../components/loading-dimmer";
import { doAddInputs, doCreateRequest, doFileUpload } from '../actions/RequestActions';

import { find } from 'lodash';

export class StandardReportInput extends Component {
	constructor(props) {
		super(props);
		let selectedReport = props.reports.find(r => r._id === props.reportId)

		this.state = {
			inputs: selectedReport.inputs.map(input => {
				return { ...input }
			}),
			reportName: selectedReport.name,
			selectedSource: null,
			selectedKey: null,
			loading: false,
			errorMessage: '',
			//hasError: true //added hasError to track validation

		}

		this.multipleInput = React.createRef();
	}

	updateColumnValue(columnName, value) {
		const { inputs } = this.state;

		this.setState({
			inputs: inputs.map(input => {
				if (input.columnName === columnName) {
					return { ...input, value: value }
				}

				return input
			})
		});
	}

	openModal(selectedSource, selectedKey) {
		// abhishek fix: handle open modal with drop down config
		this.setState({ selectedSource: selectedSource, selectedKey: selectedKey });
		const currentInput = find(this.state.inputs, { columnName: selectedKey });
		this.multipleInput.current.show(currentInput.columnName, currentInput.allowedValues, currentInput.values);
	}


	selectDate(columnName, dateType, date) {

		const { inputs } = this.state;

		this.setState({
			inputs: inputs.map(input => {
				if (input.columnName === columnName && input.isDateColumn) {
					if (dateType === "startDate") {
						return { ...input, startDate: date }
					}
					if (dateType === "endDate") {
						return { ...input, endDate: date }
					}
				}

				return input
			})
		});
	}
	updateColumnMultiple(values, filePath) {

		const { inputs, selectedKey } = this.state;

		// set default input
		// abhishek fix to handle null values
		this.setState({
			inputs: inputs.map(input => {
				if (input.columnName === selectedKey) {
					return { ...input, 
								values: values, 
								filePath: filePath, 
								value: ((values && values.length>0)||filePath!=="")?'[Multiple Values]':'' }
				}
				return input
			})
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.SET_REPORT_INPUT_STATUS !== 'SUCCESS' &&
			nextProps.SET_REPORT_INPUT_STATUS === 'SUCCESS') {
			const { sessionId, reportId } = this.props;

			const outputs = [];
			if (this.state.errorMessage.length === 0) {
				this.setState({
					loading: true
				}, () => {
					this.props.doCreateRequest(sessionId, reportId, nextProps.requestInputs, outputs)
				})

			}
		} else if (this.props.CREATE_REQUEST_STATUS !== 'SUCCESS' &&
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
	next = () => {

		const { reportId } = this.props;
		const { inputs } = this.state;
		let finalInputs = [];
		let hasError = true;


		for (let i = 0; i < inputs.length; i++) {
			if ((inputs[i].value !== undefined && inputs[i].value !== "")) {
				hasError = false;

				// if any of the column has a value, => valid=true
				let inputItem = {
					"seq": i + 1,
					"columnName": inputs[i].columnName,
					"operator": inputs[i].allowedOperators[0].value,
					"value": inputs[i].value === "[Multiple Values]" ? "" : inputs[i].value,
					"values": inputs[i].values,
					"filePath": inputs[i].filePath
				}
				finalInputs.push(inputItem);

			}
			else if (inputs[i].isDateColumn && inputs[i].startDate && inputs[i].endDate && (inputs[i].startDate <= inputs[i].endDate)) {
				hasError = false;
				let inputItem = {
					"seq": i + 1,
					"columnName": inputs[i].columnName,
					"isDateColumn": inputs[i].isDateColumn,
					"startDate": inputs[i].startDate,
					"endDate": inputs[i].endDate
				}
				finalInputs.push(inputItem);

			}
			/*	else if (inputs[i].isDateColumn && (inputs[i].startDate === undefined || inputs[i].endDate === undefined)) {
					dateError = true;
				}*/

		}
		if (hasError === false) {
			this.setState({ errorMessage: '' })
			this.props.doAddInputs(reportId, finalInputs);
		}

		else if (hasError === true) {
			this.setState({
				errorMessage: `*validation error occurred!`

			});
		}

	}

	render() {
		const { inputs } = this.state;
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
								<Button toggle active onClick={() => this.props.history.push('/standard-report-selection')}>STANDARD</Button>
								<Button toggle onClick={() => this.props.history.push('/adhoc-report-selection')}>ADHOC</Button>
							</Button.Group>
						</Grid.Column>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Header as='h4' textAlign='right'>
								{this.state.reportName}
							</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Segment basic className='content' style={{ height: 410 }}>
					<Form size='tiny'>
						{inputs.map((item) =>
							<DefaultInput
								key={item._id}
								item={item}
								updateColumnValue={this.updateColumnValue.bind(this)}
								openModal={this.openModal.bind(this)}
								selectDate={this.selectDate.bind(this)}
							/>
						)}
						<ErrorMessage errorMessage={this.state.errorMessage} />
					</Form>


				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, minWidth: 900, minHeight: 35 }}>
					<Button basic onClick={() => this.props.history.goBack()}>BACK</Button>
					<Button primary onClick={this.next}>NEXT</Button>
				</Segment>
				<LoadingDimmer active={this.state.loading} />
				<Footer />
				<ReportInputMultiple
					fileData={this.props.fileData}
					fileUploadStatus={this.props.FILE_UPLOAD_STATUS}
					doFileUpload={this.props.doFileUpload.bind(this)}
					selectedKey={this.state.selectedKey} ref={this.multipleInput}
					sessionId={this.props.sessionId}
					onClose={(values, filePath) => this.updateColumnMultiple(values, filePath)} />

			</Container>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		reports: state.report.data.reports,
		reportId: state.request.data.request.reportId,
		requestInputs: state.request.data.request.inputs,
		sessionId: state.user.data.sessionId,
		fileData: state.request.data.fileData,
		SET_REPORT_INPUT_STATUS: state.request.meta.SET_REPORT_INPUT_STATUS,
		CREATE_REQUEST_STATUS: state.request.meta.CREATE_REQUEST_STATUS,
		FILE_UPLOAD_STATUS: state.request.meta.FILE_UPLOAD_STATUS
	}
}

const mapDispatchToProps = {
	doAddInputs,
	doCreateRequest,
	doFileUpload
}
export default connect(mapStateToProps, mapDispatchToProps)(StandardReportInput);
