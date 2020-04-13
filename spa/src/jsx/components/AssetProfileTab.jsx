import React from 'react';
import { 
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  TabPane,
  Button
} from 'reactstrap';

const AssetProfileTab = (props) => {
  const {
    asset,
    handleChange,
    onCancel,
    onSave,
    tabId
  } = props;

  return (
    <React.Fragment>
      <TabPane tabId={tabId} className="mb-2 p-3">
        <Row>
          <Col sm={6}>
            <FormGroup row>
              <Label for="name" sm={2} className="font-weight-bold">Key</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="key"
                  id="key"
                  value={asset.key}
                  placeholder="Asset Key"
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2} className="font-weight-bold">Name</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={asset.name}
                  placeholder="Asset Name"
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2} className="font-weight-bold">Type</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="sentenceType"
                  id="sentenceType"
                  value={asset.sentenceType}
                  placeholder="Sentence Type"
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          {/* <Button color="danger" onClick={this.onDelete} className="m-2">Delete</Button> */}
          <span>
            <Button color="light" onClick={onCancel} className="m-2">Cancel</Button>
            <Button color="success" onClick={onSave} className="m-2">Save</Button>
          </span>
        </div>
      </TabPane>
    </React.Fragment>
  );
}

export default AssetProfileTab;
