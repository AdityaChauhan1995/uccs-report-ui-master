import React, { Component } from "react";
import Footer from '../components/footer';
import NavBar from '../components/nav-bar';
import { Container, Segment, Label } from "semantic-ui-react";
import LoadingDimmer from "../components/loading-dimmer";

//redux
import { connect } from 'react-redux';
import { doGetRequests, doFileDownload } from '../actions/RequestActions';
import CompletedRequests from '../components/completed-requests';
import PendingRequests from '../components/pending-requests';


class MyRequests extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completedRequests: [],
      pendingRequests: [],
      errorMessage: '',
      loading: true,
      downloadedFile: {
        ref: React.createRef(),
        url: null,
        fileName: null
      },

    }
  }
  calcProgress(createdDate, estimatedDuration) {
    let createdTime = new Date(createdDate).getTime();
    let currentTime = new Date().getTime();
    let durationCompleted = Math.round((currentTime - createdTime) / (1000 * 60));
    return (durationCompleted / estimatedDuration) * 100;
  }
  componentDidMount() {

    this.props.doGetRequests(this.props.sessionId);//pass sessionId
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.GET_REQUEST_STATUS === 'PENDING') {
      this.setState({ loading: true });

    } else if (nextProps.GET_REQUEST_STATUS === 'SUCCESS') {


      this.setState({
        completedRequests: nextProps.myrequests.filter(item => item.downloadUrl !== "" ),
        pendingRequests: nextProps.myrequests.filter(item => item.downloadUrl === "" ),
        loading: false,

      });
    } else if (nextProps.GET_REQUEST_STATUS === 'FAILED') {

      this.setState({
        errorMessage: "Could not find any requests!",
        loading: false
      })
    }
    if (nextProps.FILE_DOWNLOAD_STATUS === 'SUCCESS' && this.props.FILE_DOWNLOAD_STATUS !== 'SUCCESS') {

      const url = window.URL.createObjectURL(new Blob([nextProps.file]))
      this.setState({ downloadedFile: { ...this.state.downloadedFile, url: url } },
        () => this.state.downloadedFile.ref.current.click());

    }
  }
  downloadFile(downloadUrl) {
    this.setState({
      downloadedFile: { ...this.state.downloadedFile, fileName: downloadUrl.substring(downloadUrl.lastIndexOf('/')+1) } 
    });

    this.props.doFileDownload(this.props.sessionId, downloadUrl);
  }
  render() {
    const {completedRequests, pendingRequests} = this.state;
    return (
      <Container fluid className='container'>

        <NavBar index={2}
          reset={() => this.props.history.replace('/')}
          navigate={(location) => this.props.history.push(location)}
          />
        {this.state.errorMessage.length > 0 &&
          <Label basic color='red'>{this.state.errorMessage}</Label>}

        <Segment basic className='content' style={{ height: 480 }}>
          {completedRequests.length > 0 && <CompletedRequests downloadFile={this.downloadFile.bind(this)} myrequests={completedRequests} />}
          {pendingRequests.length > 0 && <PendingRequests calcProgress={this.calcProgress.bind(this)} myrequests={pendingRequests} />}
        </Segment>
        <LoadingDimmer active={this.state.loading} />
        <Footer />
        <a style={{ display: 'none' }} href={this.state.downloadedFile.url} download={this.state.downloadedFile.fileName} ref={this.state.downloadedFile.ref}>DOWNLOAD</a>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sessionId: state.user.data.sessionId,
    GET_REQUEST_STATUS: state.request.meta.GET_REQUEST_STATUS,
    FILE_DOWNLOAD_STATUS: state.request.meta.FILE_DOWNLOAD_STATUS,
    myrequests: state.request.data.myrequests,
    file: state.request.data.file,
  }
}

const mapDispatchToProps = {
  doGetRequests,
  doFileDownload
}

//export default MyRequests;
export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);