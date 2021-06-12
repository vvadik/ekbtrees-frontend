import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../Login-form';
import RegistrationForm from '../Registation-form';
import Map from '../Map';
import Home from '../Home';
import MyTrees from '../MyTrees';
import UserList from '../UserList';
import ProfileSettings from '../ProfileSettings';
import PassRecovery from '../PassRecovery';
import AboutUs from '../AboutUs';
import AddNewTreeForm from '../AddNewTreeForm'
import './Main.css';

export default class Main extends Component {
  render() {
    const {onCookie, info} = this.props;
    return (
      <main className="mainWrapper">
        <Switch>
          <Route exact path='/login' 
          render={props => <LoginForm {...props} handleCookie={onCookie} info={info}/>} />
          <Route exact path='/registration' component={RegistrationForm} />
          <Route exact path='/map'
            render={props => <Map {...props} />}
          />
          <Route exact path='/addtree/:lat/:lng' component={AddNewTreeForm} />
          <Route exact path='/' component={Home} />
          <Route exact path='/trees' component={MyTrees} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/profileSettings' component={ProfileSettings} />
          <Route exact path='/passRecovery' component={PassRecovery} />
          <Route exact path='/aboutUs' component={AboutUs} />
          <Route path='/vk' component={() => {
                    window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/vk'
                }}/>
          <Route path='/fb' component={() => {
              window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/fb'
          }}/>
        </Switch>
      </main>
    )
  }
}
