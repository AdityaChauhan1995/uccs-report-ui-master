import React, { Component } from "react";
import { Modal, Button, Segment, Form, Label, Icon } from 'semantic-ui-react';
import LoadingDimmer from "../components/loading-dimmer";
class ReportInputMultiple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			columnName: '',
			value: '',
			values: [],
			file: '',
			filePath: '',
			loading: false,
			allowedValues: []

		}
		this.fileUpload = React.createRef();
	}
	show(columnName, allowedValues, values, dimmer) {
		this.setState({ columnName, allowedValues, values:values?values:[], dimmer, open: true })
	}
	close = () => {
		const { values, filePath } = this.state;
		// call the parent function with data
		this.props.onClose(values, filePath);
		this.setState({ value: '', open: false })
	}
	reset = () => {
		this.setState({ value: '', values: [] })
	}
	add() {
		const { value, values } = this.state;
		this.setState({ values: [...values, value.trim()], value: '' })
	}
	delete(value) {
		const { values } = this.state;
		this.setState({
			values: values.filter((_value) => {
				return _value !== value
			})
		});
	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.fileUploadStatus === 'PENDING') {
			this.setState({
				loading: true
			})
		}
		if (nextProps.fileUploadStatus === 'SUCCESS' && this.props.fileUploadStatus !== 'SUCCESS') {
			this.setState({
				filePath: nextProps.fileData[0].filepath
				, loading: false,
				value: nextProps.fileData[0].filepath
			});
		}
	}

	composeFormData(file) {

		let formData = new FormData();
		formData.append(this.props.selectedKey, file);
		this.props.doFileUpload(this.props.sessionId, formData);
	}

	upload() {
		this.fileUpload.current.click();
	}

	onSelectFile = (event) => {
		// validate that the file uploaded is of proper mime type.
		var file = event.target.files[0];
		if(file.type === 'text/csv' || file.type === 'text/plain' || file.type === 'application/vnd.ms-excel'){
			this.setState({ file }); 
			this.composeFormData(file)
		}else{
			alert('Please upload either CSV or TEXT files.')
		}
		
	}

	render() {
		const { open,columnName, dimmer, value, values, allowedValues } = this.state
		return (
			<Modal dimmer={dimmer}
				open={open} closeIcon
				onClose={this.close}
				closeOnEscape={false}
				closeOnRootNodeClick={false}>
				<Modal.Header>
					Provide multiple values for <span className='highlight'>{columnName}</span>
				</Modal.Header>
				<Modal.Content style={{ minHeight: 200 }}>
					<Form size='tiny'>
						<Form.Group style={{ alignItems: 'center' }}>
							<Form.Field width={5}>

								{
									allowedValues.length > 0 ?
										(

											<Form.Dropdown fluid label="Value" 
												search 
												placeholder='Select Value'
												selection
												value={value}
												text={value === '[Multiple Values]' ? '[Multiple Values]' : ''}
												onChange={(event, data) => { this.setState({ value: data.value }) }}
												options={allowedValues}
											/>
										) :
										(
											<Form.Input fluid label='Value' placeholder='Value'
												value={value}
												onChange={(event, data) => this.setState({ value: data.value })} />
										)
								}

								
							</Form.Field>
							<Form.Field width={6}>
								<label>&nbsp;</label>
								<div>
									<Button primary onClick={() => this.add()}>ADD</Button>
									<Button color='red' onClick={() => this.upload()}>UPLOAD</Button>
									<input ref={this.fileUpload} type="file" 
										style={{ display: 'none', width: 0, height: 0, margin: 0, padding: 0 }} 
										accept="text/plain,.csv"
										onChange={this.onSelectFile} />
								</div>
							</Form.Field>
						</Form.Group>
					</Form>
					{values && values.map((item) => {
						return (
							<Label key={item} size='large'>
								{item}
								<Icon name='delete' onClick={() => this.delete(item)} />
							</Label>
						)
					})
					}

					<LoadingDimmer active={this.state.loading} />
				</Modal.Content>
				<Modal.Actions>

					<Segment basic style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Button basic onClick={this.reset}>RESET</Button>
						<Button primary onClick={this.close}>SAVE</Button>
					</Segment>

				</Modal.Actions>
			</Modal>
		)
	}
}


//export default connect(mapStateToProps, mapDispatchToProps)(ReportInputMultiple)
export default ReportInputMultiple