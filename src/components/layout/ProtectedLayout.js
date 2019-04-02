import React, { Component } from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { sendPosition } from '../../store/actions/activityActions';

class ProtectedLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
    }
  }

  componentDidMount() {
    const timer = setInterval(this.tick, 10000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.setState({timer: null});
  }

  tick = () => {
    this.props.sendPosition();
  }

  render() {
    return (
      <div>
        <NavBar authenticated/>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendPosition: () => dispatch(sendPosition()),
  }
}

export default connect(null, mapDispatchToProps)(ProtectedLayout);