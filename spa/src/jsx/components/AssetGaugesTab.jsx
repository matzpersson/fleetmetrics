import React from 'react';
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
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const AssetGaugesTab = (props) => {
  const {
    gauges,
    asset,
    toggleGaugeEditor,
    renderRows,
    addGauge,
    tabId
  } = props;

  const headers = [
    {caption: 'First Name', field: 'firstName'},
    {caption: 'Last Name', field: 'lastName'},
    {caption: 'Email', field: 'email'},
    {caption: 'Role', field: 'roleKey'},
    {caption: 'Created', field: 'createdAt'},
    {caption: 'Status', field: 'statusKey'},
  ]

  const iconName = "sensor";

  const tableHeadTh = headers.map((header, index) =>
    <th key={index}>{header.caption}</th>
  );

  const tableBodyTr = gauges.map((gauge, index) =>
    <tr key={index}>
      {/* {renderRows(headers, user)} */}
      <td><FontAwesomeIcon icon={['fal', 'trash']} /></td>
    </tr>
  );

  const newLink = `/asset/${asset._id}/gauges/new`
  return (
    <React.Fragment>
      <TabPane tabId={tabId} className="mb-2 p-3">
        <div className="d-flex justify-content-end">
          <Link to={newLink} exact={false}>
            <Button size="sm" color="success" >Add Gauge</Button>
          </Link>
        </div>
        { !gauges && (
          <div className="p-5 text-center">
            <div><FontAwesomeIcon size="3x" icon={['fal', iconName]} className="text-primary"/></div>
            <div className="mt-3">No Gauges found.</div>
          </div>
        )}
        { gauges && (
          <Table size="sm" striped>
            <thead>
              <tr>
                {tableHeadTh}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableBodyTr}
            </tbody>
          </Table>
        )}
      </TabPane>
    </React.Fragment>
  );
}

export default AssetGaugesTab;
