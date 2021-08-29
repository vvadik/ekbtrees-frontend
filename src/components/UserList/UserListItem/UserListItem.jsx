import React, { Component } from 'react';
import styles from './UserListItem.less';
import cn from "classnames";

class UserListItem extends Component {
  render() {
    return (
      <div className={styles.userListItem}>
        <table className={styles.userListItemTable}>
          <tbody>
            <tr><td>Дата</td><td>Пусто</td></tr>
            <tr><td>Имя</td><td>Пусто</td></tr>
            <tr><td>Тел</td><td>Пусто</td></tr>
            <tr><td>Email</td><td>Пусто</td></tr>
            <tr><td>Пароль</td><td>Пусто</td></tr>
            <tr><td>Статус</td><td>Пусто</td></tr>
            <tr><td>Роль</td><td>Пусто</td></tr>
            <tr><td>Актив</td><td><button className={styles.btnBlue} /><i className={cn(["fas", "fa-pencil-alt", styles.fasPencilAlt])} /><button className={styles.btnRed} /></td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default UserListItem;
