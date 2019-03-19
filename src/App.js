import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LiveMap from './components/live/LiveMap';
import ProjectDetails from './components/project/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import { connect } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {auth.uid ?           
            <ProtectedLayout className="App">
              <Route exact path='/' component={LiveMap}/>
              <Route path='/project/:id' component={ProjectDetails}/>
              <Route path='/create' component={CreateProject}/>
            </ProtectedLayout>
            :
            <DefaultLayout className="App">
              <Route exact path='/' component={SignIn}/>
              <Route path='/signin' component={SignIn}/>
              <Route path='/signup' component={SignUp}/>
            </DefaultLayout>
          }
        </Switch>
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
