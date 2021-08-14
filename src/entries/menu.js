import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "../components/App";

const root = document.getElementById('root');

if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</React.StrictMode>,
		root
	);
}
