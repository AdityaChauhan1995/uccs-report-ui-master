import React, { Component } from "react";
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import {Segment, Header, Button, Container} from 'semantic-ui-react';

import { connect } from 'react-redux';

class RequestSubmitted extends Component {
  
  render() {
    const {reportName} = this.props;
    return ( 
      <Container fluid className='container' style={{height: '100vh', minHeight: 400,}}>
				<NavBar index={1} 
                reset={()=>this.props.history.replace('/')}
                navigate={(location)=>this.props.history.push(location)}
              />

        <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',
        }}>
          <Segment basic style={{textAlign: 'center', width: 600}}>
            <Header as='h1' className='highlight'>All Done!</Header>
            <p style={{color: '#757678', fontSize: 16, paddingTop: 50}}>
              Your request for <b>{reportName}</b> has been accepted! We will notify you via email
    when the report has been processed and ready for download.
            </p>
            <Button primary size='large' onClick={()=>this.props.history.push('/my-requests')}>CHECK STATUS</Button>
          </Segment>
        </div>
        <Footer/>  
        </Container>
    )

  }
}
const mapStateToProps = (state) => {
	return {
		reportId: state.request.data.request.reportId,
		reportName: state.request.data.request.reportName,
	}
}

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSubmitted);