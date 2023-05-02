import React, { Component } from 'react';
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';

import { Container, Segment, Button, Header, Input, Icon } from 'semantic-ui-react';

export default class UIElements extends Component {
	render() {
		return (
			<Container fluid className='container'>			
				<NavBar index={1}/>
				
				<Segment basic className='content' style={{height: 480}}>
					<div>
					    <Header as='h4'>Button Group (Standard/Adhoc)</Header>
						<Button.Group basic className='round'> 
						    <Button toggle>STANDARD</Button>
						    <Button toggle active>ADHOC</Button>
						</Button.Group>

						<Header as='h4'>Primary Button</Header>
						<Button primary>DOWNLOAD</Button>

						<Header as='h4'>Secondary Button</Header>
						<Button basic>REQUEST</Button>

						<Header as='h4'>Small Primary Button</Header>
						<Button primary compact>ADD</Button>

						<Header as='h4'>Small Secondary Button</Header>
						<Button basic compact>RESET</Button>

						<Header as='h4'>Search Input</Header>
						<Input icon placeholder='Search for a report...' className='round'>
					      <input />
					      <Icon name='search' className='icon' />
					    </Input>
				    </div>
				</Segment>
				<Footer/>
			</Container>
		);
	}
}
