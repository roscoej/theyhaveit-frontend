import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

interface IProps {
    children: React.ReactNode
    title: string,
    loadData?: Function,
    onLoadData?: Function,
    useSpinner?: Function,
    auth?: boolean,
    name?: string,
};

interface IState {
    loadingData: boolean,
};

export default class PageWrapper extends React.Component<IProps, IState> {
    state = {
        loadingData: false,
    };

    componentDidMount() {
        const { loadData, onLoadData } = this.props;
        if (!!loadData && !!onLoadData) {
            this.setState({ loadingData: true });
            loadData().then((data: any) => onLoadData(data)).finally(() => this.setState({ loadingData: false }));
        }
    }
    render() {
        const { children, title, auth, name } = this.props;
        return (
            <div className={"component page-wrapper" + (name ? ` page-${name}` : "")} id="page-wrapper">
                <Head>
                    <title>theyhaveit.co &mdash; {title}</title>
                </Head>
                {!auth && (
                    <Navbar />
                )}
                <main>
                    {children}
                </main>
            </div>
        );
    }
};
