import App from '../components/App';
import Home from "../components/Home";
import PageLayout from "../components/PageLayout";

import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

if (root) {
    ReactDOM.render(
        <PageLayout />,
        root
    );
}
