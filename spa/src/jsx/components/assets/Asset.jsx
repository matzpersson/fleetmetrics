import React from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  Nav,
  NavItem,
  NavLink,
  TabContent
} from 'reactstrap';

import AssetProfileTab from "./AssetProfileTab";
import AssetPointsTab from "./AssetPointsTab";

import {
  fetchAsset,
  updateAsset,
  fetchAssets
} from "../../actions/assets"

class Asset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      goBackDefaultLink: '/assets',
      id: props.match.params.id,
      point: {},
      asset: {
        _id: null,
      },
      showGaugeEditor: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSavePoint = this.onSavePoint.bind(this);
    this.onSelectPoint = this.onSelectPoint.bind(this);
    this.onDeletePoint = this.onDeletePoint.bind(this);
  }

  componentWillMount() {
    const {
      match
    } = this.props;

    console.log("WILLMOUNT")
    this.props.dispatch(fetchAsset(match.params.id))
  }

  componentDidUpdate() {
    const {
      current,
      serial
    } = this.props.assets;

    console.log("UDPATE component", this.state.serial, serial)
    if (this.state.asset._id !== current._id || this.state.serial !== serial) {
      this.setState({
        asset: current,
        serial
      })
    }
  }

  handleChange(element){
    const asset = this.state.asset;
    asset[element.target.id] = element.target.value;

    if (element.target) {
      this.setState({
        asset,
      })
    }
  }

  onSave() {
    const {
      asset
    } = this.state;

    this.props.dispatch(updateAsset(asset));
    this.props.history.goBack(this.state.goBackLink);
  }

  onCancel() {
    this.props.history.goBack(this.state.goBackLink);
  }

  onDelete() {
    // const {
    //   org
    // } = this.state;

    // const success = window.confirm('Removing this Business permanently with all its users, jobs and manuals. Continue?');
    // if (success) {
    //   this.props.dispatch(removeUser(user.id));
    //   this.props.history.goBack(this.state.goBackLink);
    // }
  }

  onDeletePoint(id) {
    const {
      asset
    } = this.state;

    const success = window.confirm('Removing this Data Point permanently. Continue?');
    if (success) {
      const idx = asset.gauges.findIndex(gauge => gauge._id === id);
      
      asset.gauges.splice(idx, 1);
      console.log("IDX", idx, asset)
      this.props.dispatch(updateAsset(asset));

      this.setState({
        asset
      })
    }
  }

  onSelectPoint(id) {
    const {
      asset,
      point
    } = this.props;

    point = asset.gauges.find(gauge => gauge._id === id);

    this.setState({
      point
    })
  }

  onSavePoint(point, id) {
    const {
      asset
    } = this.state;

    if (id === 'new') {
      asset.gauges.push(point);
    } else {
      const idx = asset.gauges.findIndex(gauge => gauge._id === id);
      asset.gauges.splice(idx, 1, point);
    }

    this.props.dispatch(updateAsset(asset));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const {
      asset,
      point
    } = this.state;

    const {
      currentUser
    } = this.props.users;

    return (
      <div className="p-3 form">
        <h3 className="col bg-light rounded border-bottom border-primary p-2 mb-2">{asset.name}</h3>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Data Points
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="border-bottom border-primary">
          <AssetProfileTab tabId="1" asset={asset} handleChange={this.handleChange} onSave={this.onSave} onCancel={this.onCancel} />
          <AssetPointsTab tabId="2" asset={asset} currentUser={currentUser} onSavePoint={this.onSavePoint} onDeletePoint={this.onDeletePoint} />
        </TabContent>
      </div>
    );
  }
};

const mapStoreToProps = (store) => {
  return {
    assets: store.assets,
    users: store.users
  }
}

export default connect(mapStoreToProps)(Asset);
