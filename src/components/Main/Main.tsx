import AboutUs from '../AboutUs';
import AddNewTreeForm from '../AddNewTreeForm'
import EditTreeForm from '../EditTreeForm';
import TreeLists from '../TreeLists';
import LoginForm from '../Login-form';
import Home from '../Home';
import ImageView from '../ImageView';
import MapContain from '../Map';
import PassRecovery from '../PassRecovery';
import ProfileSettings from '../ProfileSettings';
import React, {Component} from 'react';
import RegistrationForm from '../Registation-form';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './Main.module.css';
import Tree from "../pages/Tree";
import UserList from '../UserList';
import {IMainProps, IMainState} from "./types";


export default class Main extends Component<IMainProps, IMainState> {
  renderRoutesWithAuth () {
      const {user} = this.props;

      return (
            <Switch>
                <Route exact path='/addtree/:lat/:lng' component={AddNewTreeForm} />
                <Route exact path='/trees/tree=:id/edit' component={EditTreeForm} />
                <Route exact path='/trees' component={TreeLists} />
                <Route exact path='/users' component={UserList} />
                <Route exact path='/profileSettings'
                       render={(props) => <ProfileSettings {...props} user={user} />} />
                <Redirect to='/' />
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
    // FIXME: What types should these properties have
    vkAuth2: any = () => {
        window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/vk'
    };

  // FIXME: What types should these properties have
    fbAuth2: any = () => {
        window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/fb'
    };

  render () {
      const {user} = this.props;

    return (
      <main className={styles.mainWrapper}>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} user={user} />} />
          <Route exact path='/map' render={(props) => <MapContain {...props} user={user} className='fullMap' />} />
            <Route exact path='/trees/tree=:id' render={(props) => <Tree {...props} user={user} />} />
          <Route exact path='/passRecovery' component={PassRecovery} />
          <Route exact path='/aboutUs' component={AboutUs} />
            <Route path='/vk' component={this.vkAuth2}/>
            <Route path='/fb' component={this.fbAuth2}/>
            <Route exact path='/image/:id' component={ImageView} />
            {this.renderRoutes()}
            <Redirect to='/' />
        </Switch>
      </main>
    )
  }
}
