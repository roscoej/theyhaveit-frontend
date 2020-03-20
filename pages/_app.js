import App, { Container } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import '../sass/index.scss';
import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  	render() {
		const { Component, pageProps } = this.props;
		return (
			<React.Fragment>
  				<Component {...pageProps} />
				<ToastContainer />
			</React.Fragment>
			
		);
  	}
};

Modal.setAppElement("#__next");
export default MyApp;
