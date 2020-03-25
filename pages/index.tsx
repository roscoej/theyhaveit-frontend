import React from 'react';
import Router from 'next/router';
import ApiRequest from '../common/api';
import { toast } from 'react-toastify';
import PageWrapper from '../components/PageWrapper';
import SignUpForm from '../components/SignUpForm';

interface IState {
	loading: boolean,
};

export default class Home extends React.Component<{}, IState> {
	state = {
		loading: false,
	};

	submit = async (phone: string, country: string) => {
		try {
			this.setState({ loading: true });
			const res = await ApiRequest({
				method: "GET",
				url: `/signup?number=${"+" + phone.replace(/[^0-9]+/g,'')}`
			});
			const { names } = res.data;
			let url = `/signup?phone=${phone}&country=${country}`;
			if (names.length > 0) {
				url += `&names=${JSON.stringify(names)}`
			}
			Router.push(url);
		} catch (e) {
			console.error(e);
			toast.error(e, { hideProgressBar: true });
			this.setState({ loading: false })
		}
	};

  	render() {
		const { loading } = this.state;
		return (
			<PageWrapper title="free in-stock alerts" name="home">
				<section>
					<h1>Get <span className="primary">free and instant in-stock alerts</span> on essentials like hand sanitizer, paper towels, and other items</h1>
					<h2>We search 5 websites for 20 different products every 5 minutes to identify items that are currently in-stock</h2>
				</section>
				<section>
					<p>Sign up to get free in-stock alerts</p>
					<SignUpForm
						onSubmit={(value: string, country: string) => {
							if (value.length < 7) {
								return toast.error("Please enter a valid phone number.", { hideProgressBar: true });
							}
							this.submit(value, country);
						}}
						disabled={false}
						loading={loading}
					/>
				</section>
			</PageWrapper>
		);
  	}
};
