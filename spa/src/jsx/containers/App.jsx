import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import '../../styles/App.css';
import Base from '../components/Base.jsx';
import Login from '../components/Login.jsx';

class App extends Component {
  componentWillMount() {

  }

  render() {
    const {
      authenticated
    } = this.props.auth;

    // const authenticated = false;

    return (
      <Router>
        <div className="container-fluid p-0 h-100 d-flex flex-column">
        { !authenticated && (<Login />) }
        { authenticated && (
          <Switch>
            <Base />
          </Switch>
        )}
        </div>
      </Router>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    clusters: store.clusters,
    auth: store.auth
  }
}

export default connect(mapStoreToProps)(App);
