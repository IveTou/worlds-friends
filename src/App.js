import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import LiveMap from './components/live/LiveMap';
import DashBoard from './components/dashboard/Dashboard';
import ProjectDetails from './components/project/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirect, ...props }) => 
     isAllowed 
     ? <Route {...props}/> 
     : <Redirect to={redirect} />;

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={auth.uid ? LiveMap : SignIn}/>
            <ProtectedRoute 
              isAllowed={!auth.uid}
              redirect='/'  
              path='/signin' 
              component={SignIn}
            />
            <ProtectedRoute 
              isAllowed={!auth.uid}
              redirect='/'  
              path='/signup' 
              component={SignUp}
            />
            <ProtectedRoute 
              isAllowed={auth.uid}
              redirect='/signin'  
              path='/project/:id' 
              component={ProjectDetails}
            />
            <ProtectedRoute 
              isAllowed={auth.uid} 
              redirect='/signin'  
              path='/create' 
              component={CreateProject}
            />
          </Switch>
        </div>
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
