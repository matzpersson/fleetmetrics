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
  fetchAsset
} from "../../actions"

class AssetPoint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      goBackDefaultLink: '/assets',
      id: props.match.params.id,
      assetId: null,
      gauge: {
        name: 'New Gauge',
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

    // this.onCancel = this.onCancel.bind(this);
    // this.onDelete = this.onDelete.bind(this);
    // this.editUser = this.editUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const matchArray = this.props.match.url.split('/');
    const assetId = matchArray[2];

    this.setState({
      assetId
    })

    this.props.dispatch(fetchAsset(assetId))

    this.setModels()
  }

  componentDidUpdate() {
    this.setModels()
  }

  setModels() {
    const {
      current
    } = this.props.assets;

    const {
      models
    } = this.state;

    if (current && current.models !== models) {
      this.setState({
        models: current.models
      })
    }
  }

  handleChange(element){
    const gauge = this.state.gauge;
    gauge[element.target.id] = element.target.value;
    if (element.target) {
      this.setState({
        gauge,
      })
    }
  }

  onSave() {
    const {
      asset
    } = this.state;

    // this.props.dispatch(updateOrg(org));
    // this.props.history.goBack(this.state.goBackLink);
  }

  onCancel() {
    const {
      history
    } = this.props;
    history.goBack();
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

  render() {
    const {
      gauge,
      models
    } = this.state;

    const { 
      current
    } = this.props.assets;

    let modelList = null;
    if (models) {
      modelList = models.map((model, index) =>
        <option key={index} value={model.name.toLowerCase()}>{model.name}</option>
      )
    }

    console.log(current.name)
    const assetGauge = {gauge: gauge, assetName: current.name, assetKey: current.key}

    return (
      <div className="m-3 form">
        <h3 className="col bg-light rounded border-bottom border-primary p-2 mb-2">Gauge name: {gauge.name}</h3>
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
                  value={gauge.name}
                  onChange={this.handleChange}
                >
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="modelName" sm={12} className="font-weight-bold">Data Model</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="modelName"
                  id="modelName"
                  value={gauge.modelName}
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
                  value={gauge.fieldName}
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
                  value={gauge.valueSuffix}
                  onChange={this.handleChange}
                >
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Min/Max Values</Label>
              <Col sm={12}>
                <Row>
                  <Input
                    type="text"
                    name="minValue"
                    id="minValue"
                    value={gauge.minValue}
                    onChange={this.handleChange}
                    className="col ml-3 mr-1"
                  >
                  </Input>
                  <Input
                    type="text"
                    name="maxValue"
                    id="maxValue"
                    value={gauge.maxValue}
                    onChange={this.handleChange}
                    className="col ml-1 mr-3"
                  >
                  </Input>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Alert Lower/Upper Value</Label>
              <Col sm={12}>
                <Row>
                    <Input
                      type="text"
                      name="minAlert"
                      id="minAlert"
                      value={gauge.minAlert}
                      onChange={this.handleChange}
                      className="col ml-3 mr-1"
                    >
                    </Input>
                    <Input
                      type="text"
                      name="maxAlert"
                      id="maxAlert"
                      value={gauge.maxAlert}
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
              <Label for="roleName" sm={12} className="font-weight-bold">Real-time Gauge</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="gaugeType"
                  id="gaugeType"
                  value={gauge.gaugeType}
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
          <Col className="" sm="1">
            <Button size="sm" color="success" className="w-100 m-1">Save</Button>
            <Button size="sm" color="primary" className="w-100 m-1">Cancel</Button>
            <Button size="sm" color="danger" className="w-100 m-1">Delete</Button>
          </Col>
        </Row>

      </div>
    );
  }
};

const mapStoreToProps = (store) => {
  return {
    assets: store.assets
  }
}

export default connect(mapStoreToProps)(AssetPoint);
