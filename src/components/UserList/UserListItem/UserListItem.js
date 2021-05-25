import React, { Component } from 'react';
import './UserListItem.css';

export default class UserListItem extends Component {
  render() {
    return (
      <div className='user-list-item'>
        <table className='user-list-item-table'>
          <tbody>
            <tr><td>Дата</td><td>Пусто</td></tr>
            <tr><td>Имя</td><td>Пусто</td></tr>
            <tr><td>Тел</td><td>Пусто</td></tr>
            <tr><td>Email</td><td>Пусто</td></tr>
            <tr><td>Пароль</td><td>Пусто</td></tr>
            <tr><td>Статус</td><td>Пусто</td></tr>
            <tr><td>Роль</td><td>Пусто</td></tr>
            <tr><td>Актив</td><td><button className='btn-blue'></button><i className="fas fa-pencil-alt"></i><button className='btn-red'></button></td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}