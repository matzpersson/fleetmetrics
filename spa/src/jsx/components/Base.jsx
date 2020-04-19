import React, { Component } from 'react';
import { routes } from '../constants/routes';
import AppMenuItem from './AppMenuItem';
import AppFilterItem from './AppFilterItem';
import logo from '../../images/logo.png';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import socketIOClient from "socket.io-client";
import AssetGaugeClass from './AssetGaugeClass';

import { putMetrics } from "../actions/"
import { fetchDemoUser } from "../actions/users"

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

    this.renderGauges = this. renderGauges.bind(this);
  }

  componentDidMount() {
    // Temporary demo user environment
    this.props.dispatch(fetchDemoUser());

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => this.props.dispatch(putMetrics(data)));
  }

  renderGauges(asset) {
    const gauges = this.props.gauges.rows.showInMenu.filter(gauge => gauge.assetId === asset._id)
    console.log("GUAUGE", asset, this.props.gauges.rows.showInMenu)
    const realtimeGauges = gauges.map((gauge, index) =>
      <div style={{backgroundColor: '#333333', marginBottom: 1}} >
        <AssetGaugeClass assetGauge={gauge} gaugePanelBackground="bg-none" />
      </div>
    );
    return (realtimeGauges);
  }

  render() {
    const {
      match,
      location
    } = this.props;

    // const realtimeGauges = this.props.gauges.rows.showInMenu.map((gauge, index) =>
    //   <div key={index} className="text-center rounded" style={{backgroundColor: '#333333'}} >
    //     <div className="p-1 rounded" style={{backgroundColor:'#222222'}}><small>{gauge.assetName}</small></div>
    //     <AssetGaugeClass assetGauge={gauge} gaugePanelBackground="bg-none" />
    //   </div>
    // );

    const assetsGauges = this.props.assets.rows.map((asset, index) =>
      <div key={index} className="text-center rounded" >
        <div className="mt-2 p-1 rounded" style={{backgroundColor:'#222222'}}><small>{asset.name}</small></div>
        {this.renderGauges(asset)}
      </div>
    )

    return (
      <Row className="m-0 p-0 d-flex flex-columns align-content-sm-stretch h-100">
        <Col className="listview">
          <div className="p-3 d-flex justify-content-start border-bottom border-primary" style={{backgroundColor: '#444444'}}>
            <h4 className="m-0"><FontAwesomeIcon icon={['fal','chart-network']} className="mr-3" /></h4>
            <h4 className="text-primary m-0">FleetMetrics</h4>
          </div>
          <div className="section-header mt-3">
            <span className="section-title text-bold text-light">MANAGE</span>
          </div>
          <ul className="list-group">
            <AppMenuItem url="/" caption="Dashboard" iconName="tachometer-fast" location={location}/>
            <AppMenuItem url="/fleet" caption="Fleet" iconName="chart-network" location={location} />
            <AppMenuItem url="/assets" caption="Assets" iconName="cube" location={location} />
            <AppMenuItem url="/metrics" caption="Stream" iconName="stream" location={location} />
            <AppMenuItem url="/statistics" caption="Statistics" iconName="chart-line" location={location} />
          </ul>

          <div className="section-header mt-3">
            <span className="section-title text-bold text-light">METRIC WATCH</span>
          </div>
          <div className="m-2">
            {assetsGauges}
          </div>

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
    metrics: store.metrics,
    gauges: store.gauges,
    assets: store.assets
  }
}

export default connect(mapStoreToProps)(Base);
