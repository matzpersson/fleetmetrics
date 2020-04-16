import React from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetRealTimeGauge from './AssetRealTimeGauge';

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

class AssetGauge extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      goBackDefaultLink: '/assets',
      id: props.match.params.id,
      gauge: {
        name: '',
        modelName: null,
        fieldName: null,
        valueSuffix: null,
        value: 18,
        minValue: 0,
        maxValue: 100,
        minAlert: 30,
        maxAlert: 80
      }
    };

    // this.onCancel = this.onCancel.bind(this);
    // this.onDelete = this.onDelete.bind(this);
    // this.editUser = this.editUser.bind(this);
    // this.removeInvite = this.removeInvite.bind(this);
  }

  componentWillMount() {
    console.log("PROPS", this.props)
  }

  componentDidUpdate() {

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
      gauge 
    } = this.state;

    return (
      <div className="p-3 form">
        <h3 className="col bg-light rounded border-bottom border-primary p-2 mb-2">Gauge name</h3>
        <Row className="border rounded bg-light p-2">
          <Col>
            <AssetRealTimeGauge />
          </Col>
          <Col>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Gauge Name</Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="roleName"
                  id="roleName"
                  value={gauge.name}
                  onChange={() => {}}
                >
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Data Model</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="roleName"
                  id="roleName"
                  value={gauge.modelName}
                  onChange={() => {}}
                >
                  <option value="gpll">GPGLL</option>
                  <option value="Editor">INMWI</option>
                  <option value="Contributor">INDPT</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Value Field</Label>
              <Col sm={12}>
                <Input
                  type="select"
                  name="roleName"
                  id="roleName"
                  value={gauge.fieldName}
                  onChange={() => {}}
                >
                  <option value="gpll">Field-1</option>
                  <option value="Editor">Field-1</option>
                  <option value="Contributor">Field-1</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roleName" sm={12} className="font-weight-bold">Data Suffix</Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="roleName"
                  id="roleName"
                  value={gauge.valueSuffix}
                  onChange={() => {}}
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
                    name="roleName"
                    id="roleName"
                    value={'gll'}
                    onChange={() => {}}
                    className="col ml-3 mr-1"
                  >
                  </Input>
                  <Input
                    type="text"
                    name="roleName"
                    id="roleName"
                    value={''}
                    onChange={() => {}}
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
                      name="roleName"
                      id="roleName"
                      value={'gll'}
                      onChange={() => {}}
                      className="col ml-3 mr-1"
                    >
                    </Input>
                    <Input
                      type="text"
                      name="roleName"
                      id="roleName"
                      value={''}
                      onChange={() => {}}
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
                  name="roleName"
                  id="roleName"
                  value={'dial'}
                  onChange={() => {}}
                >
                  <option value="dial">Dial</option>
                  <option value="Editor">Slider</option>
                  <option value="Contributor">Text Value</option>
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

export default connect(mapStoreToProps)(AssetGauge);
