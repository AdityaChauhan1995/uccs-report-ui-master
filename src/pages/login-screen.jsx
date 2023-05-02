import React, { Component } from "react";
import { Button, Input, Container, Header, Segment } from "semantic-ui-react";
import Footer from '../components/footer';
import LoadingDimmer from "../components/loading-dimmer";

//redux
import { connect } from 'react-redux';
import { doLogin } from '../actions/UserActions';
import ErrorMessage from "../components/show-error";

class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    }

    this.showErr = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.LOGIN_STATUS === 'SUCCESS') {
      this.setState({ loading: false });
      this.props.history.push('/my-requests');
    } else if (nextProps.LOGIN_STATUS === 'FAILED') {
      this.setState({ loading: false });
      this.showErr.current.open('Invalid Credentials', 'Invalid email-address or password. Please check.');
    }
  }

  login = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    this.props.doLogin(email, password);
  }

  render() {
    const { email, password, loading } = this.state;

    return (
      <Container fluid style={{ height: '100vh' }}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Segment basic style={{ width: 350 }}>

            <Header as='h1' textAlign='center' style={{ marginBottom: 25 }}>
              <font color='#293895'>UCCS</font>&nbsp;
              <font color='#757678'>Reporting</font>
            </Header>

            <Input
              style={{ marginBottom: 15 }}
              fluid
              icon='mail'
              iconPosition="left"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder='Email Address' />

            <Input
              style={{ marginBottom: 15 }}
              fluid
              type='password'
              size='large'
              icon='lock'
              iconPosition="left"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder='Password' />

            <Button primary className='primaryButton' floated='right' size='large'
              onClick={this.login}>
              LOGIN
            </Button>
          </Segment>
        </div>
        <Footer />
        <LoadingDimmer active={loading} />
        <ErrorMessage ref={this.showErr}/>
      </Container>
    )

  }
}


const mapStateToProps = (state) => {
  return {
    LOGIN_STATUS: state.user.meta.LOGIN_STATUS,
    sessionId: state.user.data.sessionId

  }
}

const mapDispatchToProps = {
  doLogin,
}

//export default LoginScreen;
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)