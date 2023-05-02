import React, { Component } from 'react';
import { Container, Segment, Button, Header, Grid, Form } from 'semantic-ui-react';
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import ReportInputMultiple from './report-input-multiple';
import DefaultInput from '../components/default-input';
import DynamicInput from '../components/dynamic-input';
import ErrorMessage from '../components/error-message'
import { connect } from 'react-redux';
import { doAddInputs, doFileUpload } from '../actions/RequestActions';

import {find} from 'lodash';

export class AdhocReportInput extends Component {
	constructor(props) {
		super(props)
		let selectedReport = props.reports.find(r => r._id === props.reportId)
		this.state = {
			defaultInputs: selectedReport.inputs.map(input => {
				return { ...input } //add hasError to track validation
			}),
			inputs: [],
			nextKey: 0,
			selectedSource: null,
			selectedKey: null,
			errorMessage: [],
		}
		this.multipleInput = React.createRef();
	}

	openModal(selectedSource, selectedKey) {
		// abhishek fix: handle open modal with drop down config
		this.setState({ selectedSource: selectedSource, selectedKey: selectedKey });
		if(selectedSource === 'default'){
			const currentInput = find(this.state.defaultInputs, {columnName: selectedKey});
			this.multipleInput.current.show(currentInput.columnName, currentInput.allowedValues, currentInput.values);
		}else{
			const currentInput = find(this.state.inputs, {key: selectedKey});
			this.multipleInput.current.show(currentInput.columnName, currentInput.allowedValues, currentInput.values);
		}
	}

	findColumn(columnName) {
		const { columnsMeta } = this.props;
		let column = null;
		for (var i = 0; i < columnsMeta.length; i++) {
			if (columnsMeta[i].columnName === columnName) {
				column = columnsMeta[i];
			}
		}
		return column;
	}

	updateConditionColumn(key, value) {
		const { inputs } = this.state;
		this.setState({
			inputs: inputs.map(input => {
				if (input.key === key) {
					return {
						...input,
						...this.findColumn(value),
						columnName: value,// TODO: add column description here
						operator: '',
						value: '',
						values: [],
						file: '',
						filePath: ''
					}
				}
				return input
			})
		});
	}
	updateConditionOperator(key, value) {
		const { inputs } = this.state;
		this.setState({
			inputs: inputs.map(input => {
				if (input.key === key) {
					return { ...input, operator: value }
				}
				return input
			})
		});
	}
	selectDate(columnName, dateType, date) {
		

		const { defaultInputs } = this.state;

		this.setState({
			defaultInputs: defaultInputs.map(defaultInput => {
				if (defaultInput.columnName === columnName && defaultInput.isDateColumn) {
					if (dateType === "startDate") {
						return { ...defaultInput, startDate: date }
					}
					if (dateType === "endDate") {
						return { ...defaultInput, endDate: date }
					}
				}

				return defaultInput
			})
		});
	}
	updateColumnValue(selectedKey, value, selectedSource = 'default') {
		const { inputs, defaultInputs } = this.state;
		if (selectedSource === 'default') {
			// set default input
			this.setState({
				defaultInputs: defaultInputs.map(input => {
					if (input.columnName === selectedKey) {
						return { ...input, value: value }
					}
					return input
				})
			});
		} else {
			// set dynamic input
			this.setState({
				inputs: inputs.map(input => {
					if (input.key === selectedKey) {
						return { ...input, value: value }
					}
					return input
				})
			});
		}
	}
	updateColumnMultiple(values, filePath) {
		console.log(values,filePath);
		const { defaultInputs, inputs, selectedSource, selectedKey } = this.state;
		if (selectedSource === 'default') {
			// set default input
			// abhishek fix to handle null values
			this.setState({
				defaultInputs: defaultInputs.map(input => {
					if (input.columnName === selectedKey) {
						return { ...input, 
								 values: values, 
								 filePath: filePath, 
								 value: ((values && values.length>0)||filePath!=="")?'[Multiple Values]':'' }
					}
					return input
				})
			});
		} else {
			// set dynamic input
			
			this.setState({
				inputs: inputs.map(input => {
				
					if (input.key === selectedKey) {

						return { ...input, values: values, value:(values.length>0||filePath!=="")?'[Multiple Values]':'', filePath: filePath }
					}
					return input
				})
			});
		}
	}
	addNewCondition() {
		const { inputs, nextKey } = this.state;
		this.setState({
			inputs: [...inputs, {
				key: nextKey,
				columnName: '',
				operator: '',
				value: '',
				values: [],
				file: '',
				hasError: false, //added hasError to track error
				allowedOperators: [],
				allowedValues: [],
				allowFileUpload: true,
				allowMultiple: true,
			}],
			nextKey: nextKey + 1
		});
	}
	deleteCondition(key) {
		const { inputs } = this.state;
		this.setState({
			inputs: inputs.filter((x) => {
				return x.key !== key
			})
		});
	}
	componentWillReceiveProps(nextProps) {

		if (this.props.SET_REPORT_INPUT_STATUS !== 'SUCCESS' &&
			nextProps.SET_REPORT_INPUT_STATUS === 'SUCCESS') {
			this.props.history.push('/adhoc-report-output');
		}
		
	}
	next = () => {
		let error = [];
		let finalInputs = [];
		const {reportId} = this.props;
		const {inputs, defaultInputs} = this.state;
		let seq = 0
		let defaultInputError = true
		for (var dI of defaultInputs) {
			seq = seq + 1
			if (dI.value !== undefined && dI.value !== "") {
				defaultInputError = false
				let inputItem = {
					"seq": seq,
					"columnName": dI.columnName,
					"operator": dI.allowedOperators[0].value,
					"value": dI.value === "[Multiple Values]" ? "" : dI.value,
					"values": dI.values,
					"filePath": dI.filePath
				}
				finalInputs.push(inputItem);
			}
			else if (dI.isDateColumn && dI.startDate && dI.endDate && dI.startDate<=dI.endDate) {
		     defaultInputError=false
				let inputItem = {
					"seq": seq + 1,
					"columnName": dI.columnName,
					"isDateColumn": dI.isDateColumn,
					"startDate":dI.startDate,
					"endDate": dI.endDate
				}
				finalInputs.push(inputItem);

			}
			/*else if (dI.isDateColumn && (dI.startDate === undefined || dI.endDate === undefined)) {
				//dateError = true //date column not selected
				if(defaultInputError===true) //if  default error as well as date error
				{
                  defaultInputError= true
				}
				
			}*/

		

		}
		
		
		for (var input of inputs) {
			seq = seq + 1
			if (input.value === undefined || input.value === "") {
				error.push(input.columnName);
			}
			else if (input.operator === undefined || input.operator === "") {
				error.push(input.columnName);
			}
			else {
				let inputItem = {
					"seq": seq,
					"columnName": input.columnName,
					"operator": input.operator,
					"value": input.value === "[Multiple Values]" ? "" : input.value,
					"values": input.values,
					"filePath": input.filePath
				}

				finalInputs.push(inputItem);
			}
		}

		this.setState({

			inputs: inputs.map(input => {
				if (error.includes(input.columnName)) {

					return { ...input, hasError: true }
				}
				else {
					return { ...input, hasError: false }
				}


			}),
			errorMessage: error.length > 0 ? "*Missing required fields" : defaultInputError === true ? "Please select atleast one default input and both dates in case of date inputs" : ""
		}, () => {

			if (this.state.errorMessage.length === 0) //if no error
			{
				this.props.doAddInputs(reportId, finalInputs);
			}
		});
	}
	render() {
		const { defaultInputs, inputs } = this.state;
		const { columns } = this.props;

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
								<Button toggle onClick={() => this.props.history.push('/adhoc-report-selection')} active>ADHOC</Button>
							</Button.Group>
						</Grid.Column>
						<Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
							<Header as='h4' textAlign='right'>
								Adhoc Report (Filter Conditions)
							</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Segment basic className='content' style={{ height: 410 }}>
					<Form size='tiny'>
						{/*Default input renderer*/}
						{defaultInputs.map((item) =>
							<DefaultInput key={item.columnName}
								item={item}
								updateColumnValue={this.updateColumnValue.bind(this)}
								openModal={this.openModal.bind(this)}
								selectDate={this.selectDate.bind(this)}
								/>
						)}
						{inputs.map((item) =>
							<DynamicInput
								key={item.key}
								item={item}
								columns={columns}
								updateColumnValue={this.updateColumnValue.bind(this)}
								updateConditionColumn={this.updateConditionColumn.bind(this)}
								updateConditionOperator={this.updateConditionOperator.bind(this)}
								openModal={this.openModal.bind(this)}
								deleteCondition={this.deleteCondition.bind(this)}
								/>
						)}
						<ReportInputMultiple
							fileData={this.props.fileData}
							fileUploadStatus={this.props.FILE_UPLOAD_STATUS}
							doFileUpload={this.props.doFileUpload.bind(this)}
							selectedKey={this.state.selectedKey} ref={this.multipleInput}
							sessionId={this.props.sessionId}
							onClose={(values, filePath) => this.updateColumnMultiple(values, filePath)} />

						<Button basic compact onClick={() => this.addNewCondition()}>New Condition</Button><br /><br />
						<ErrorMessage errorMessage={this.state.errorMessage} />
					</Form>
				</Segment>
				<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, minWidth: 900, minHeight: 35 }}>
					<Button basic onClick={() => this.props.history.goBack()}>BACK</Button>
					<Button primary onClick={this.next}>NEXT</Button>
				</Segment>
				<Footer />
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reports: state.report.data.reports,
		columns: state.report.data.adhocinputs.columns,
		columnsMeta: state.report.data.adhocinputs.columnsMeta, //correction in api needed
		reportId: state.request.data.request.reportId,
		sessionId: state.user.data.sessionId,
		fileData: state.request.data.fileData,
		SET_REPORT_INPUT_STATUS: state.request.meta.SET_REPORT_INPUT_STATUS,
		FILE_UPLOAD_STATUS: state.request.meta.FILE_UPLOAD_STATUS,
		// componentDidMount props
		requestInputs: state.request.data.request.inputs

	}
}

const mapDispatchToProps = {
	doAddInputs,
	doFileUpload
}
export default connect(mapStateToProps, mapDispatchToProps)(AdhocReportInput);
