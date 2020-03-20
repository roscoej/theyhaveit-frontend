import React from 'react';
//@ts-ignore
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Button from './Button';

interface IState {
    value: string,
    country: string,
};

interface IProps {
    onSubmit: Function,
    disabled: boolean,
    value?: string,
    country?: string,
    valid?: boolean,
};

export default class SignUpForm extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            country: '',
        };
    };

    render() {
        let { value, country } = this.state;
        const { onSubmit, disabled, valid } = this.props;
        if (this.props.value) {
            value = this.props.value;
        }
        if (this.props.country) {
            country = this.props.country;
        }
        let priority = country === "ca" ? {ca:0, us:1} : {us:0, ca:1};
        return (
            <div className="component signup-form">
                <PhoneInput
                    value={value}
                    country={"ca"}
                    onChange={(value: string, country: any) => {
                        if (disabled) return null;
                        this.setState({ value, country: country.countryCode });
                    }}
                    priority={priority}
                    onlyCountries={['us', 'ca']}
                    disabled={disabled || false}
                />
                {!disabled && (
                    <Button onClick={() => onSubmit(value, country)}>Next</Button>
                )}
                {valid && (
					<img className="check" src="/static/Check.svg" alt="" />
                )}
            </div>
        );
    }
};
