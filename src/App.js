import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LiveMap from './components/live/LiveMap';
import ProjectDetails from './components/project/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DefaultLayout from './components/layout/DefaultLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        {auth.uid ? 
          <ProtectedLayout>
            <Route exact path='/' component={LiveMap}/>
            <Route exact path='/project/:id' component={ProjectDetails}/>
            <Route exact path='/create' component={CreateProject}/>
          </ProtectedLayout>
          :
          <DefaultLayout className="App">
            <Switch>
              <Route exact path='/' component={SignIn}/>
              <Route exact path='/signin' component={SignIn}/>
              <Route exact path='/signup' component={SignUp}/>
            </Switch>
          </DefaultLayout>
        }
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(App);
