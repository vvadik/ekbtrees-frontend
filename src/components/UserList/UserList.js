import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import styles from './UserList.module.css';
import UserListItem from './UserListItem';

export default class UserList extends Component {
  render() {
    return (
      <React.Fragment>
        <UserInfo />
        <section className={styles.userListSection}>
          <div className={styles.userListColumn}>
            <UserListItem />
            <UserListItem />
            <UserListItem />
          </div>
          <div className={styles.userListColumn}>
            <UserListItem />
            <UserListItem />
            <UserListItem />
          </div>
        </section>
      </React.Fragment>
    )
  }
}
