import React from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  Button,
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
} from "../../actions/assets"

class Asset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      goBackDefaultLink: '/assets',
      id: props.match.params.id,
      asset: {
        _id: null,
      },
      showGaugeEditor: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSave = this.onSave.bind(this);
    this.toggleGaugeEditor = this.toggleGaugeEditor.bind(this);
    this.updateGauge = this.updateGauge.bind(this);

    this.onCancel = this.onCancel.bind(this);
    // this.onDelete = this.onDelete.bind(this);
    // this.editUser = this.editUser.bind(this);
    // this.removeInvite = this.removeInvite.bind(this);
  }

  componentWillMount() {
    const {
      match
    } = this.props;

    this.props.dispatch(fetchAsset(match.params.id))
  }

  componentDidUpdate() {
    const {
      current
    } = this.props.assets;

    if (this.state.asset._id !== current._id) {
      this.setState({
        asset: current
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  updateGauge() {

    this.toggleGaugeEditor()
  }
  toggleGaugeEditor() {
    this.setState({
      showGaugeEditor: !this.state.showGaugeEditor
    });
    console.log("toggle editor", this.state.showGaugeEditor)
  }

  // editUser(user) {
  //   const lnk = `/home/users/${user.id}`;
  //   this.props.history.push(lnk);
  // }

  // removeInvite(user) {
  //   this.setState({
  //     submitting: true,
  //     errorMessage: null
  //   })

  //   const success = window.confirm('Removing this user permanently. Continue?');
  //   if (success) {
  //     // this.props.dispatch(removeInvite(user.id))
  //   }
    
  // }

  renderGauges(headers, user) {
    // const iconName = "user";
    // const iconColour = "text-success mr-3"
    // const tableTd = headers.map((header, index) =>
    //   <td key={index}>{(index === 0 ? <FontAwesomeIcon icon={['fal', iconName]} className={iconColour} /> : null)}{user[header.field]}</td>
    // );

    // return tableTd;
  }

  render() {
    const {
      asset,
      showGaugeEditor
    } = this.state;

    const gauges = (asset.gauges ? asset.gauges : [] );
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
          <AssetPointsTab tabId="2" asset={asset} gauges={gauges} renderGauges={this.renderGauges} />
        </TabContent>
      </div>
    );
  }
};

const mapStoreToProps = (store) => {
  return {
    assets: store.assets
  }
}

export default connect(mapStoreToProps)(Asset);
