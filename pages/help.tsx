import React from 'react';
import PageWrapper from '../components/PageWrapper';

export default class HelpUs extends React.Component {
    render() {
        const contact = "mailto:jacob@roscoeholdings.com";
        return (
            <PageWrapper title="Help Us" name="help">
                <section>
                    <h1>Here's how you can help us help others</h1>
                    <p><span className="highlight">If you are an online retailer, <a href={contact}><u>please contact us.</u></a></span> A direct relationship with retailers can help us deliver more accurate and up-to-date results.</p>
                    <p><span className="highlight">If you are a developer, <a href={contact}><u>please contact us.</u></a></span> Our team is working to fine tune our system &mdash; we are constantly looking for help to improve our service.</p>
                    <p><span className="highlight">If you are a member of the press, <u>please spread the word.</u></span> Our goal is to deliver a free solution for those who aren't able to find basic necessities online or at their local stores.</p>
                </section>
            </PageWrapper>
        );
    };
};
