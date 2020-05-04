import React from 'react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetDataPoint from './AssetDataPoint';

import { 
  Table,
  TabPane,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import {
  fetchAsset,
  updateAsset
} from "../../actions/assets"

class AssetPoint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      goBackDefaultLink: '/assets',
      id: props.match.params.id,
      assetId: null,
      asset: {},
      point: {
        name: 'New Data Point',
        textValue: '',
        modelName: 'n/a',
        fieldName: 'field-0',
        valueSuffix: 'm',
        gaugeType: 'number',
        value: 0,
        minValue: 0,
        maxValue: 100,
        minAlert: 30,
        maxAlert: 80,
        alertMessage: null,
        gaugeColour: '#4285f4',
        gaugePanel: 'bg-primary'
      },
      models: null
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const {
      asset
    } = this.state;

    if (this.props.asset) {
      asset = this.props.asset
    }

    const matchArray = this.props.match.url.split('/');
    const assetId = matchArray[2];

    this.setState({
      assetId
    })

    this.props.dispatch(fetchAsset(assetId))
  }

  componentDidUpdate() {
    this.setAsset();
  }

  setAsset() {
    const {
      current,
    } = this.props.assets;

    let {
      asset,
      point,
      id
    } = this.state;

    if (current && current._id !== asset._id) {
      if (id !== 'new') {
        point = current.gauges.find(gauge => gauge._id === id);
      }
      
      this.setState({
        asset: current,
        point
      })

    }
  }

  handleChange(element){
    const point = this.state.point;
    point[element.target.id] = element.target.value;
    if (element.target) {
      this.setState({
        point,
      })
    }
  }

  onSave() {
    const {
      asset,
      point,
      id,
      goBackDefaultLink
    } = this.state;

    if (id === 'new') {
      asset.gauges.push(point);
    } else {
      const idx = asset.gauges.findIndex(gauge => gauge._id === id);
      asset.gauges.splice(idx, 1, point);
    }

    this.props.dispatch(updateAsset(asset));
    this.props.history.goBack();
  }

  onCancel() {
    const {
      history
    } = this.props;
    history.goBack();
  }

  onDelete() {
    const {
      asset,
      point
    } = this.state;

    const success = window.confirm('Removing this Data Point permanently. Continue?');
    if (success) {
      // this.props.dispatch(removeUser(user.id));
      this.props.history.goBack();
    }
  }

  render() {
    const {
      point,
      asset
    } = this.state;

    const { 
      current
    } = this.props.assets;

    let modelList = null;
    if (asset && asset.models) {
      modelList = asset.models.map((model, index) =>
        <option key={index} value={model.name.toLowerCase()}>{model.name}</option>
      )
    }

    const assetGauge = {gauge: point, assetName: asset.name, assetKey: asset.key}

    // -- Set permissions visibility
    const canUpdate = this.props.users.currentUser.permissions.find(permission => permission.tag === 'putAssets') || false;
    const canDelete = this.props.users.currentUser.permissions.find(permission => permission.tag === 'deleteAssets') || false;

    return (
      <div className="m-3 form">
        <h3 className="col bg-light rounded border-bottom border-primary p-2 mb-2">Gauge name: {point.name}</h3>
        <Row className="border rounded bg-light m-0 p-2">
          <Col sm={3} className="text-center p-2">
            <AssetDataPoint assetGauge={assetGauge} gaugePanelBackground="bg-primary" />
          </Col>
          <Col>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Gauge Name</Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={point.name}
                  onChange={this.handleChange}
                >
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="model" sm={12} className="font-weight-bold">Data Model</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="model"
                  id="model"
                  value={point.model}
                  onChange={this.handleChange}
                >
                  <option value="n/a">None</option>
                  {modelList}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="fieldName" sm={12} className="font-weight-bold">Value Field</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="fieldName"
                  id="fieldName"
                  value={point.fieldName}
                  onChange={this.handleChange}
                >
                  <option value="field-0">Field-0</option>
                  <option value="field-1">Field-1</option>
                  <option value="field-2">Field-2</option>
                  <option value="field-3">Field-3</option>
                  <option value="angle">Angle</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="valueSuffix" sm={12} className="font-weight-bold">Data Suffix</Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="valueSuffix"
                  id="valueSuffix"
                  value={point.valueSuffix}
                  onChange={this.handleChange}
                >
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Label for="minValue" sm={12} className="font-weight-bold">Min/Max Values</Label>
              <Col sm={12}>
                <Row>
                  <Input
                    type="text"
                    name="minValue"
                    id="minValue"
                    value={point.minValue}
                    onChange={this.handleChange}
                    className="col ml-3 mr-1"
                  >
                  </Input>
                  <Input
                    type="text"
                    name="maxValue"
                    id="maxValue"
                    value={point.maxValue}
                    onChange={this.handleChange}
                    className="col ml-1 mr-3"
                  >
                  </Input>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="minAlert" sm={12} className="font-weight-bold">Alert Lower/Upper Value</Label>
              <Col sm={12}>
                <Row>
                    <Input
                      type="text"
                      name="minAlert"
                      id="minAlert"
                      value={point.minAlert}
                      onChange={this.handleChange}
                      className="col ml-3 mr-1"
                    >
                    </Input>
                    <Input
                      type="text"
                      name="maxAlert"
                      id="maxAlert"
                      value={point.maxAlert}
                      onChange={this.handleChange}
                      className="col ml-1 mr-3"
                    >
                    </Input>
                  </Row>
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Label for="gaugeType" sm={12} className="font-weight-bold">Real-time Gauge</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="gaugeType"
                  id="gaugeType"
                  value={point.gaugeType}
                  onChange={this.handleChange}
                >
                  <option value="dial">Dial</option>
                  <option value="number">Number</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Historical Chart</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="roleName"
                  id="roleName"
                  value={'bars'}
                  onChange={() => {}}
                >
                  <option value="line">Line</option>
                  <option value="bars">Bars</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex justify-content-center m-2">
          { canUpdate && (<Button size="md" color="success" className="m-1" onClick={this.onSave}>Save</Button>)}
          <Button size="md" color="primary" className="m-1" onClick={this.onCancel} >Cancel/Close</Button>
          { canDelete && (<Button size="md" color="danger" className="m-1" onClick={this.onDelete}>Delete</Button>)}
        </div>
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

export default connect(mapStoreToProps)(AssetPoint);
