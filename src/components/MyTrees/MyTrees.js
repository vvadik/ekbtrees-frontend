import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import JsonService from '../../services/json-service';
import ListOfTrees from './ListOfTrees';
import './MyTrees.css';

export default class MyTrees extends Component {
    service = new JsonService();
    render() {
        return (
            <React.Fragment>
                <UserInfo />
                <ListOfTrees getData={this.service.getTrees}/>
            </React.Fragment>
        )
    }
}