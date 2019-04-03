import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { connect } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import World from './pages/world/World';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {auth.uid ?           
            <ProtectedLayout className="App">
              <Route exact path='/' component={World}/>
              <Route render={() => <Redirect to="/" />} />
            </ProtectedLayout>
            :
            <DefaultLayout className="App">
              <Route exact path="/" render={() => <Redirect to="/signin" />} />
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
