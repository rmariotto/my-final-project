import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            newPassword: '',
            secretCode: '',
            error: false,
            errorMessage: '',
            step: 1
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitSecretCode(e) {
        e.preventDefault();
        let self = this;

        axios.post('/resetPassword/start', {
            email: this.state.email,
        })
            .then(function (result) {
                console.log('result from axios POST //password/reset/start: ', result);
                self.setState({ step: 2 });
            })
            .catch(function (err) {
                console.log('err in axios POST //password/reset/start: ', err);
                self.setState({ errorMessage: 'Enter a valid email!' });
            });
    }

    submit(e) {
        e.preventDefault();
        let self = this;

        axios.post('/resetPassword/verify', {
            email: self.state.email,
            newPassword: self.state.newPassword,
            secretCode: self.state.secretCode
        })
            .then(function (result) {
                console.log('result from axios POST //password/reset/verify: ', result);
                self.setState({ step: 3 });
            })
            .catch(function (err) {
                console.log('err in axios POST //password/reset/verify: ', err);
                self.setState({ errorMessage: 'Enter a valid code!' });
            });
    }

    render() {
        if (this.state.step == 3) {
            return (
                <div className="reset-container">
                    <p className="p-resetpass">Your password has been updated!</p>
                    <Link className="reset-login" to="/login">login</Link>
                </div>
            );
        } else if (this.state.step == 2) {
            return (
                <div className="input-container">
                    <form autoComplete="off" >
                        <input className="inputfile" type="text" name="secretCode" value={this.state.secretCode} placeholder="code" autoComplete="off" onChange={e => this.handleChange(e)} />
                        <input className="inputfile" type="password" name="newPassword" placeholder="new password" autoComplete="off" onChange={e => this.handleChange(e)} />
                        <input className="inputfile" type="submit" value="submit" className="btn" onClick={e => this.submit(e)} />
                        {this.state.errorMessage &&
                            <h3 className="error"> {this.state.errorMessage} </h3>}
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="">
                        <form autoComplete="off" >
                            <h3>Reset your password</h3>
                            <p className="p-resetpass">Please enter the email address with which you registered</p>
                            <input className="inputfile inputfileReset" type="email" name="email" value={this.state.email} placeholder="enter your email" autoComplete="off" onChange={e => this.handleChange(e)} />
                            <input className="inputfile" type="submit" value="submit" className="btn" onClick={e => this.submitSecretCode(e)} />
                            {this.state.errorMessage &&
                                <h3 className="error"> {this.state.errorMessage} </h3>}
                        </form>
                    </div>
                </div>
            );
        }
    }
}