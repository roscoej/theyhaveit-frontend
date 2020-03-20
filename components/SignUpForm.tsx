import React from 'react';
//@ts-ignore
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Button from './Button';

interface IState {
    value: string,
};

interface IProps {
    onSubmit: Function,
    disabled: boolean,
    value?: string,
};

export default class SignUpForm extends React.Component<IProps, IState> {
    state = {
        value: '',
    };

    render() {
        let { value } = this.state;
        const { onSubmit, disabled } = this.props;
        if (this.props.value) {
            value = this.props.value;
        }
        return (
            <div className="component signup-form">
                <PhoneInput
                    country="us"
                    value={value}
                    onChange={(value: string) => disabled ? null : this.setState({ value })}
                />
                {!disabled && (
                    <Button onClick={() => onSubmit(value)}>Next</Button>
                )}
            </div>
        );
    }
};
