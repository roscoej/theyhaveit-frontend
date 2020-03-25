import React from 'react';
import PageWrapper from '../components/PageWrapper';

export default class HelpUs extends React.Component {
    render() {
        const contact = "jacob@roscoeholdings.com";
        return (
            <PageWrapper title="About" name="about">
                <section>
                    <h1>About us:</h1>
                    <p>We are a small group of people who met on the Internet from USA, Venezuela, Brazil, and India.</p>
                    <h1>Our mission:</h1>
                    <p>We intend to help people find daily necessities before they're sold out.</p>
                    <h1>Contact us:</h1>
                    <p><a href={`mailto:${contact}`}><u>{contact}</u></a></p>
                </section>
            </PageWrapper>
        );
    };
};
