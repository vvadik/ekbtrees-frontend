import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../Login-form';
import RegistrationForm from '../Registation-form';
import MapContain from '../Map/MapContain';
import Home from '../Home';
import MyTrees from '../MyTrees';
import UserList from '../UserList';
import ProfileSettings from '../ProfileSettings';
import PassRecovery from '../PassRecovery';
import AddNewTreeForm from '../AddNewTreeForm';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/registration' component={RegistrationForm} />
          <Route exact path='/map'
            render={props => <MapContain {...props} />}
          />
          <Route exact path='/home' component={Home} />
          <Route exact path='/myTrees' component={MyTrees} />
          <Route exact path='/userList' component={UserList} />
          <Route exact path='/profileSettings' component={ProfileSettings} />
          <Route exact path='/passRecovery' component={PassRecovery} />
          <Route exact path='/addtree' component={AddNewTreeForm} />
        </Switch>
      </main>
    )
  }
}