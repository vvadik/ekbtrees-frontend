import Home from '../components/Home/Home';
import PageLayout from "../components/PageLayout";

import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

if (root) {
    ReactDOM.render(
        <PageLayout>
            <Home />
        </PageLayout>,
        root
    );
}
