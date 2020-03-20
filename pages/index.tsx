import React from 'react';
import { toast } from 'react-toastify';
import PageWrapper from '../components/PageWrapper';
import SignUpForm from '../components/SignUpForm';

interface IState {
	phone: string,
};

export default class Home extends React.Component<IState, {}> {
	state = {
		phone: "",
	};

	submit = async () => {
		const { phone } = this.state;
		this.setState({ loading: true });
	};

  	render() {
		return (
			<PageWrapper title="free in-stock alerts" name="home">
				<section>
					<h1>Get <span className="primary">free and instant in-stock alerts</span> on essentials like hand sanitizer, paper towels, and other items</h1>
					<h2>We search 10 websites for 100 different products every 5 minutes to identify items that are currently in-stock</h2>
				</section>
				<section>
					<p>Sign up to get free in-stock alerts</p>
					<SignUpForm
						onSubmit={(value: string) => {
							if (value.length < 7) {
								return toast.error("Please enter a valid phone number.", { hideProgressBar: true });
							}
							this.submit();
						}}
						disabled={false}
					/>
				</section>
			</PageWrapper>
		);
  	}
};
