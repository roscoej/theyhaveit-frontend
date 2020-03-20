import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface IState {
    isMenuOpen: boolean,
};

export default class Navbar extends React.Component<{}, IState> {
    state = {
        isMenuOpen: false,
    };
    render() {
        const links: Array<{ url: string, img?: string, label?: string, placeholder?: string }> = [
            { url: "/list", label: "Stock List", placeholder: "The stock list is available soon." },
            { url: "/help", label: "Help Us" },
            { url: "/about", label: "About" },
        ];

        const linksNode = () => {
            return (
                <React.Fragment>
                    {links.map((link, i: number) => (
                        <li className="link" key={i}>
                            {link.placeholder ? (
                                <a style={{userSelect: "none", cursor: "pointer"}} onClick={() => {
                                    toast.info(link.placeholder, { hideProgressBar: true })
                                }}>{link.label}</a>
                            ) : (
                                <Link href={link.url}>
                                    <a>{link.label}</a>
                                </Link>
                            )}
                        </li>
                    ))}
                </React.Fragment>
            );
        };
        return (
            <nav className="component navbar">
                <div className="content">
                    <Link href="/">
                        <img src="/static/Logo.png" alt="" />
                    </Link>
                    <ul className="links">
                        {linksNode()}
                        <div className="burger-menu">
                            <Menu
                                right
                                onStateChange={(state: any) => this.setState({ isMenuOpen: state.isOpen })}
                                isOpen={this.state.isMenuOpen}
                                outerContainerId={'page-wrapper'}
                                pageWrapId={'page-wrapper'}
                            >
                                {linksNode()}
                            </Menu>
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}
