import React from 'react';

interface IProps {
    onClick: Function,
    children: React.ReactNode,
    loading?: boolean,
    style?: any,
};

export default class Button extends React.Component<IProps, {}> {
    render() {
        const { onClick, children, style, loading } = this.props;
        return (
            <div role="button" style={style} onClick={(e) => onClick(e)} className={"component button" + (loading ? " loading": "")}>
                {children}
            </div>
        );
    }
}