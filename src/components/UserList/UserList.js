import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import './UserList.css';
import UserListItem from './UserListItem';

export default class UserList extends Component {
  render() {
    return (
      <React.Fragment>
        <UserInfo />
        <section className='user-list-section'>
          <div className='user-list-column'>
            <UserListItem />
            <UserListItem />
            <UserListItem />
          </div>
          <div className='user-list-column'>
            <UserListItem />
            <UserListItem />
            <UserListItem />
          </div>
        </section>
      </React.Fragment>
    )
  }
}