import AboutUs from '../AboutUs';
import AddNewTreeForm from '../AddNewTreeForm'
import EditTreeForm from '../EditTreeForm';
import ListOfTrees from '../ListOfTrees';
import LoginForm from '../Login-form';
import Home from '../Home';
import ImageView from '../ImageView';
import MapContain from '../Map';
import PassRecovery from '../PassRecovery';
import ProfileSettings from '../ProfileSettings';
import React, { Component } from 'react';
import RegistrationForm from '../Registation-form';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './Main.module.css';
import Tree from "../pages/Tree";
import UserList from '../UserList';

export default class Main extends Component {
  renderRoutesWithAuth () {
      const {user} = this.props;

      return (
            <Switch>
                <Route exact path='/addtree/:lat/:lng' component={AddNewTreeForm} />
                <Route exact path='/trees/tree=:id/edit' component={EditTreeForm} />
                <Route exact path='/trees' component={ListOfTrees} />
                <Route exact path='/users' component={UserList} />
                <Route exact path='/profileSettings'
                       render={(props) => <ProfileSettings {...props} user={user} />} />
                <Redirect to="/" />
            </Switch>
        );
  }

  renderRoutesWithoutAuth () {
      const {onCookie} = this.props;

      return (
          <>
          <Route
              path='/login'
              render={props => <LoginForm {...props} handleCookie={onCookie}
              />}
          />
          <Route exact path='/registration' component={RegistrationForm} />
          </>
      )
  }

  renderRoutes () {
      const {user} = this.props;

      if (user) {
          return this.renderRoutesWithAuth();
      }

      return this.renderRoutesWithoutAuth();
  }

  render () {
      const {user} = this.props;

    return (
      <main className={styles.mainWrapper}>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} user={user} />} />
          <Route exact path='/map' render={(props) => <MapContain {...props} styleName="shrinkMap" user={user} />} />
            <Route exact path='/trees/tree=:id'
                   render={(props) => <Tree {...props} user={user} />} />
          <Route exact path='/passRecovery' component={PassRecovery} />
          <Route exact path='/aboutUs' component={AboutUs} />
          <Route path='/vk' component={() => {
              window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/vk'
          }}/>
          <Route path='/fb' component={() => {
              window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/fb'
          }}/>
            <Route exact path='/image/:id' component={ImageView} />
            {this.renderRoutes()}
            <Redirect to="/" />
        </Switch>
      </main>
    )
  }
}
