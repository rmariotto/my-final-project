import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitRegister(e) {
        e.preventDefault();
        var self = this;

        axios.post('/register', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        })
            .then(function (result) {
                console.log('result from axios POST /register: ', result);
                location.replace('/');

            })
            .catch(function (err) {
                console.log('err in axios POST /register:: ', err);
                self.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <p className="p-registration">Let's together feel the moment and through the song relax to create strong mindfulness.</p>
                    </div>
                    <p className="pregister"><strong>Register now!</strong></p>
                </div>
                <form autoComplete="off" >
                    <input className="inputfile" type="text" name="first" placeholder="first name" value={this.state.first} autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input className="inputfile" type="text" name="last" placeholder="last name" value={this.state.last} autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input className="inputfile" type="email" name="email" placeholder="email" value={this.state.email} autoComplete="off" onChange={e => this.handleChange(e)} />
                    <input className="inputfile" type="password" name="password" placeholder="password" value={this.state.password} autoComplete="new-password" onChange={e => this.handleChange(e)} />
                    <input type="submit" value="register" className="btn" onClick={e => this.submitRegister(e)} />
                    <Link to='/login' className="login">login</Link>
                    {this.state.error &&
                        <h3 className="error"> {this.state.error} </h3>}
                </form>
            </div>
        );
    }
}