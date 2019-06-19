import React from "react";
import { Button, TextField } from "@material-ui/core";
import { feedbackAction } from "core/actions/feedback-action";

const validation = {
	email : (val) => {
		let error = null;
		const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!emailValidation.test(val)) {
			error = "E-mail введений не вірно!";
		}
		return error;
	},
	tel : (val) => {
		if (val.length <= 10) {
			return "Не менше 2 символів!";
		}
		return null;
	}
};

export class FeedbackForm extends React.Component {
	state = {
		email : "o.d.bilyigmail.com",
		tel : "0684090455",
		message : "Test Item",
		error : {
			tel : null,
			email : null,
		},
	}

	fieldsChange = event => {
		const errorText = validation[event.target.name](event.target.value);

		this.setState({
			[event.target.name] : event.target.value,
			error : {
				...this.state.error,
				[event.target.name] : errorText,
			},
		});
	};

	haveError = () => {
		let haveError = false;
		const fields = Object.keys(this.state.error);
		fields.forEach(i => {
			if (this.state.error[i] !== null || this.state[i] === "") {
				haveError = true;
			}
		});
		return haveError;
	};

	_sendToManager = (event) => {
		event.preventDefault();

		const {email, tel, message, emailError, telError} = this.state

		if (!emailError && !telError) {
			feedbackAction({email,tel, message})
		}
	}

	render() {
		const {error, email, tel, message} = this.state;

		return (
			<form className="send-to-manager-form" onSubmit={this._sendToManager}>
				<div className={`input-container ${error.email ? 'error' : ''}`}>
					<TextField
						type="email"
						name="email"
						value={email}
						placeholder="ваш email"
						onChange={this.fieldsChange}
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
					{error.email && <p className="error-text">Не вірний формат email</p>}
				</div>
				<div className={`input-container ${error.tel ? 'error' : ''}`}>
					<TextField
						name="tel"
						type="text"
						value={tel}
						placeholder="ваш телефон"
						onChange={this.fieldsChange}
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
					{error.tel && <p className="error-text">Не вірний формат телуфона</p>}
				</div>
				<div className="input-container">
					<TextField
						type="text"
						multiline
						name="message"
						value={message}
						onChange={this.fieldsChange}
						placeholder="ваше повідомлення"
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
				</div>
				<Button
					aria-label="login"
					disabled={this.haveError()}
					className="submit-button"
					type="submit">відправити</Button>
			</form>
		)
	}
}
