import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { connect } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import World from './pages/world/World';
import Ways from './pages/ways/Ways';

const ProtectedRoute 
  = ({ isAllowed, ...props }) => 
     isAllowed 
     ? <Route {...props}/> 
     : <Redirect to="/"/>;

class App extends Component {
  render() {
    const { auth, hasATarget } = this.props;

    return (
      <BrowserRouter>
        {auth.uid ?           
          <ProtectedLayout className="App">
            <Switch>
              <Route exact path='/' component={World}/>
              <ProtectedRoute 
                isAllowed={hasATarget} 
                exact 
                path="/finding-ways" 
                component={Ways}
              />
              <Route component={World} />
            </Switch>
          </ProtectedLayout>
          :
          <DefaultLayout className="App">
            <Switch>
              <Route exact path='/signin' component={SignIn}/>
              <Route exact path='/signup' component={SignUp}/>
              <Route component={SignIn} />
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
    hasATarget: !!state.maps.targetUserId,
  }
}

export default connect(mapStateToProps)(App);
