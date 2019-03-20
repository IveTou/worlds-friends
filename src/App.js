import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import ProjectDetails from './components/project/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import { connect } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import MapCanvas from './components/live/MapCanvas';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {auth.uid ?           
            <ProtectedLayout className="App">
              <Route exact path='/' component={MapCanvas}/>
              <Route path='/project/:id' component={ProjectDetails}/>
              <Route path='/create' component={CreateProject}/>
              <Route render={() => <Redirect to="/" />} />
            </ProtectedLayout>
            :
            <DefaultLayout className="App">
              <Route path='/signin' component={SignIn}/>
              <Route path='/signup' component={SignUp}/>
              <Route render={() => <Redirect to="/signin" />} />
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
