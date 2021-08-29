import ReactDOM from "react-dom";
import React from "react";
import PageLayout from "components/PageLayout";
import RegistrationForm from "../components/Registation-form";

const root = document.getElementById('root');

if (root) {
	ReactDOM.render(
		<React.StrictMode>
			<PageLayout>
				<RegistrationForm />
			</PageLayout>
		</React.StrictMode>,
		root
	);
}
