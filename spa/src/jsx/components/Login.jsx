import React from 'react';
import { connect } from "react-redux";
import { 
  Card,
  FormGroup,
  Button,
  Input
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  login
} from "../actions/auth"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      login: {
        email: 'matz@fleetmetrics.io',
        password: '12345'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  handleChange(element){
    const login = this.state.login;
    login[element.target.id] = element.target.value;

    if (element.target) {
      this.setState({
        login,
      })
    }
  }

  onLogin() {
    this.props.dispatch(login(this.state.login))
  }

  render() {
    const {
      login
    } = this.state;

    const {
      loginMessage,
      authenticated
    } = this.props.auth

    const appIcon = 'chart-network';
    const appTitle = 'FleetMetrics';

    // let { from } = this.props.location.state || { from: { pathname: "/home" } };
    const from = '/assets';
    if (authenticated) return <Redirect to={from} />;

    return (
      <div className="container-fluid p-0 h-100 bg-light row align-items-center d-flex justify-content-center">
        <Card className="p-2 card-border-color border-primary login text-center">
          <FontAwesomeIcon size="4x" icon={['fal', appIcon]} className="text-primary m-3" />
          <h3 className="text-secondary mt-2">{appTitle}</h3>
          { !loginMessage && ( <small className="text-secondary">Please enter your user information</small>)}
          { loginMessage && ( <p className="text-danger">{loginMessage}</p> )}
          <div className="m-4">
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={login.email}
                placeholder="Email Address" 
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                value={login.password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button onClick={this.onLogin} className="bg-primary mt-3 w-100">Login</Button>
            <div className="m-2 d-flex justify-content-between">
              <small><a href="/forgotpassword">Forgot Password?</a></small>
              <small><a href="/register">Register</a></small>
            </div>

          </div>
        </Card>
      </div>
    );
  }
};

const mapStoreToProps = (store) => {
  return {
    auth: store.auth
  }
}

export default connect(mapStoreToProps)(Login);
