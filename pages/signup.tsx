import React from 'react';
import Router from 'next/router';
import Modal from 'react-modal';
import { Tooltip } from 'react-tippy';
import { toast } from 'react-toastify';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PageWrapper from '../components/PageWrapper';
import SignUpForm from '../components/SignUpForm';
import Button from '../components/Button';
import ApiRequest from '../common/api';
import { allAlertTypes, mainAlertTypes }  from '../common/alerts';

import { AxiosError } from 'axios';

interface IProps {
	query?: {
		phone: string,
		country: string,
	},
};

interface IState {
	alertSettings: Array<string>,
    phone: string,
	zip: string,
	zipValid: boolean,
	loading: boolean,
	modalOpen: boolean,
};

export default class SignUp extends React.Component<IProps, IState> {
	state = {
		alertSettings: [],
        phone: "",
		zip: "",
		zipValid: false,
		loading: false,
		modalOpen: false,
	};

	static getInitialProps(ctx: any) {
		const { query } = ctx;
		return { query };
	}

	componentDidMount() {
		const { query } = this.props;
		if (!query || !query.phone || !query.country) {
			return Router.push("/");
		} else {
			this.setState({ phone: query.phone });
		}
	}

	onChangeAlertSetting = (value: string) => {
		let alertSettings : string[] = this.state.alertSettings;
		if (alertSettings.includes(value)) {
			alertSettings = alertSettings.filter(a => a !== value);
		} else {
			alertSettings.push(value);
		}
		return this.setState({ alertSettings });
	};

	submit = async () => {
		const { alertSettings, phone, zip } = this.state;
		this.setState({ loading: true });

		ApiRequest({
			method: "POST",
			url: "/signup",
			data: {
				zip,
				number: "+" + phone.replace(/[^0-9]+/g,''),
				items: alertSettings,
			},
		}).then(res => {
			const { isUpdated } = res.data;
			const msg = isUpdated ? "Thanks for updating your settings, we just sent you a text!" : "Thanks for signing up, we just sent you a text!"
			this.setState({ loading: false });
			toast.success(msg, { hideProgressBar: true });
		}).catch((error: AxiosError) => {
			let msg = "";
			try {
				if (error.response) {
					msg = typeof error.response.data === "string" ? error.response.data : error.response.data.message;
				} else throw new Error("Unknown error response");
			} catch(e) {
				msg = "An error has occured, please try again.";
			}
			console.error(error);
			console.info(error.response);
			toast.error(msg, { hideProgressBar: true });
			this.setState({ loading: false });
		});
	};

	isValidZip = (zip: string, countryCode: string | undefined) => {
		if (!countryCode || !zip) {
			return false;
		}
		let postalCodeRegex = null;
		switch (countryCode.toUpperCase()) {
			case "US":
				postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
				break;
			case "CA":
				postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
				break;
			default:
				postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
		}
		return postalCodeRegex.test(zip);
	};

	onChangeZip = (zip: string) => {
		if (isNaN(Number(zip))) {
			return;
		}
		if (zip.length > 5) {
			return;
		}
		let isValid = true;
		this.setState({ zip });
	};

  	render() {
		const { query } = this.props;
		const { modalOpen, loading, zip } = this.state;
		let alertSettings : string[] = this.state.alertSettings;
		let showableAlerts = mainAlertTypes;
		showableAlerts = showableAlerts.concat(allAlertTypes.filter(a => !showableAlerts.includes(a) && alertSettings.includes(a)));

		return (
			<PageWrapper title="free in-stock alerts" name="signup">
				<h1>Sign up to get free in-stock alerts</h1>
				<section>
					<Tooltip title="We use your phone number to send you in-stock alerts." className="help">
						<img className="help" src="/static/Info.svg" alt=""/>
					</Tooltip>
                    <label>Enter your mobile number</label>
					<SignUpForm
						value={query?.phone || ""}
						country={query?.country || ""}
						disabled={true}
						valid={true}
                        onSubmit={() => null}
					/>
				</section>
                <section>
					<Tooltip title="We use your zip code to find in-stock items near you." className="help">
						<img className="help" src="/static/Info.svg" alt="" />
					</Tooltip>
                    <label>Enter your zip code</label>
					<div className="zip-wrapper">
						<input
							placeholder="10001"
							onChange={e => this.onChangeZip(e.target.value)}
							value={zip}
						/>
						{this.isValidZip(zip, query?.country) && (
							<img src="/static/Check.svg" alt="" style={{position: "absolute", right: 15}} />
						)}
					</div>
				</section>
                <section>
                    <label>Select your alert settings</label>
                    <div className="alert__settings">
						<div className="alert__list">
							<FormGroup>
								{showableAlerts.map((setting, i: number) => (
									<FormControlLabel
										key={i}
										value={setting}
										label={setting}
										control={<Checkbox
											checked={!!alertSettings.find(x => x === setting)}
											onChange={() => this.onChangeAlertSetting(setting)}
											value={setting}
										/>}
									/>
								))}
							</FormGroup>
						</div>
						<p role="link" onClick={() => this.setState({ modalOpen: true })}>Choose from more alerts</p>
                    </div>
                </section>
                <section>
                    <Button loading={loading} style={{position: "relative"}} onClick={() => this.submit()}>
                        {'Sign Up'}
                    </Button>
                    <p className="meta">By pressing “Sign Up” you agree to our <a href="https://app.termly.io/document/privacy-policy/b866dd23-01eb-41df-807d-4ce4e3bf1ea4">Privacy Policy</a>, <a href="https://app.termly.io/document/terms-of-use-for-website/149fe9fe-d92a-423b-8359-a46765b8d446">Terms and Conditions</a>, and <a href="https://app.termly.io/document/disclaimer/e9824ace-9f6a-44ad-bf19-b4445afb2d80">disclaimer.</a> Msg &amp; data rates may apply</p>
                </section>
				<Modal
					isOpen={modalOpen}
					style={modalStyle}
					onRequestClose={() => this.setState({ modalOpen: false })}
				>
					<div className="modal__body">
						<div className="modal__header">
							<h1>
								Choose your alert settings
							</h1>
						</div>
						<div className="modal__list">
							{allAlertTypes.map((setting, i: number) => (
								<FormControlLabel
									key={i}
									value={setting}
									label={setting}
									control={<Checkbox
										checked={!!alertSettings.find(x => x === setting)}
										onChange={() => this.onChangeAlertSetting(setting)}
										value={setting}
									/>}
								/>
							))}
						</div>
						<div className="modal__action">
							<Button onClick={() => this.setState({ modalOpen: false })}>
								Save Selection
							</Button>
						</div>
					</div>
				</Modal>
			</PageWrapper>
		);
  	}
};

const modalStyle = {
	content: {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		padding               : 0,
	},
};