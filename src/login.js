import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitLogin(e) {
        e.preventDefault();
        var self = this;

        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (result) {
                console.log('result from axios POST /login: ', result);
                location.replace('/');
            })
            .catch(function (err) {
                console.log('err in axios POST /login:: ', err);
                self.setState({errorMessage: 'you must be registered!'});
            });
    }

    render() {
        return (
            <div className="input-container">
                <form autoComplete="off" >
                    <input className="inputfile" type="" name="email" placeholder="email" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input className="inputfile" type="password" name="password" placeholder="password" autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input type="submit" value="login" className="btn" onClick={e => this.submitLogin(e)} />
                    <Link to='/resetPassword' className="path-login">forgot password</Link>
                    {this.state.errorMessage &&
                        <h3 className="error"> {this.state.errorMessage} </h3>}
                </form>
            </div>
        );
    }
}