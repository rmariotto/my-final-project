import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';
import ResetPassword from './resetPassword';

export default function Welcome(props) {
    return (
        <div className='welcome-container'>
            <h2>MINDSPACE</h2>
                    <HashRouter>
                        <div className="router">
                        
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />

                            <Route path="/resetPassword" component={ResetPassword} />
                        </div>
                    </HashRouter>
                    <footer className="welome-footer">© 2020 MINDSPACE FINAL PROJECT SPICED ACADEMY</footer>
        </div>
    );
}
