import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Content from "./content";
import { Link } from 'react-router-dom';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount() {
    axios.get("/user").then((result) => {
      this.setState(
        {
          first: result.data.first,
          last: result.data.last,

        });
    })
      .catch((err) => {
        console.log('err in get axios /user:', err);
      });
  }

  render() {
    return (
      <div className="app-container">
        <div className="nav">
          <div className="nav-subtitle">
          <p>Mindspace is a place to experience the benefits of meditation anytime, anywhere with awesome videos.</p>
          </div>
          
          <a href="/logout" className="logout">logout</a>
        </div>
        <BrowserRouter>

          <Link to='/about' className="login">about</Link>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                <Content
                  first={this.state.first}
                  last={this.state.last}
                />

              )}
            />
          </div>

        </BrowserRouter>
        <footer className="welome-footer">© 2020 MINDSPACE FINAL PROJECT SPICED ACADEMY</footer>
      </div >
    );
  }
}