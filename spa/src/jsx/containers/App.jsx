import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import '../../styles/App.css';
import Base from '../components/Base.jsx';
// import { fetchInstances } from "../actions/"


class App extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <Router>
        <div className="container-fluid p-0 h-100 d-flex flex-column">
          <Switch>
            <Base />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    clusters: store.clusters
  }
}

export default connect(mapStoreToProps)(App);
