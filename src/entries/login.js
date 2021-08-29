import ReactDOM from "react-dom";
import React from "react";
import LoginForm from "components/Login-form";
import PageLayout from "components/PageLayout";

const root = document.getElementById('root');

if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<PageLayout>
				<LoginForm />
			</PageLayout>
		</React.StrictMode>,
		root
	);
}
