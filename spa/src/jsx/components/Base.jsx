import React, { Component } from 'react';
import { routes } from '../constants/routes';
import AppMenuItem from './AppMenuItem';
import AppFilterItem from './AppFilterItem';
import logo from '../../images/logo.png';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { putMetrics } from "../actions/"
import socketIOClient from "socket.io-client";

import { 
  Row,
  Col
} from 'reactstrap';

import { 
  Route
} from "react-router-dom";

class Base extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.props.dispatch(putMetrics(data)));
  }

  render() {
    const {
      match,
      location
    } = this.props;

    const {
      assets
    } = this.props.metrics;

    return (
      <Row className="m-0 p-0 d-flex flex-columns align-content-sm-stretch h-100">
        <Col className="listview">
          <div className="p-3 d-flex justify-content-start border-bottom border-primary" style={{backgroundColor: '#444444'}}>
            <h4 className="m-0"><FontAwesomeIcon icon={['fal','chart-network']} className="mr-3" /></h4>
            <h4 className="text-primary m-0">FleetMetrics</h4>
          </div>
          <div className="section-header mt-3">
            <span className="section-title text-bold text-white">MANAGE</span>
          </div>
          <ul className="list-group">
            <AppMenuItem url="/" caption="Dashboard" iconName="tachometer-fast" location={location}/>
            <AppMenuItem url="/fleet" caption="Fleet" iconName="chart-network" location={location} />
            <AppMenuItem url="/assets" caption="Assets" iconName="box" location={location} />
            <AppMenuItem url="/metrics" caption="Stream" iconName="stream" location={location} />
          </ul>
        </Col>
        <Col className="addScroll m-0 p-0">
          {
            routes.map((route, index) => (
              <Route
                exact={route.exact}
                key={index}
                path={route.path}
                component={route.component}
              />
            ))
          }
        </Col>
      </Row>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    metrics: store.metrics
  }
}

export default connect(mapStoreToProps)(Base);
