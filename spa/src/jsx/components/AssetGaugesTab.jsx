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
    tabId
  } = props;

  const headers = [
    {caption: 'Name', field: 'name'},
    {caption: 'Model', field: 'modelName'},
    {caption: 'Type', field: 'gaugeType'},
    {caption: 'Min', field: 'minValue'},
    {caption: 'Max', field: 'maxValue'},
    {caption: 'Alert Low', field: 'minAlert'},
    {caption: 'Alert High', field: 'maxAlert'},
  ]

  const renderRows = (headers, row) => {
    
    let iconColour = "text-success mr-3"

    const tableTd = headers.map((header, index) => {
      let cellValue = row[header.field];
      return (<td key={index}>{cellValue}</td>)
    });

    return tableTd;
  }


  const tableHeadTh = headers.map((header, index) =>
    <th key={index}>{header.caption}</th>
  );

  const link = '';
  const tableBodyTr = gauges.map((gauge, index) => {
    let iconName = "circle";
    switch (gauge.gaugeType) {
      case 'dial':
        iconName = 'tachometer';
        break;
      case 'number':
        iconName = 'text';
        break;
      default:
        iconName = 'thermometer';
        break;
    }
    return (<tr key={index}>
      <td><FontAwesomeIcon icon={['fal', iconName]} className={'text-success'} /></td>
      {renderRows(headers, gauge)}
      <td><Link to={link} ><FontAwesomeIcon icon={['fal', 'edit']} className={'text-primary'} /></Link></td>
      <td><FontAwesomeIcon icon={['fal', 'trash']} className={'text-danger'} /></td>
    </tr>)
  });

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
            <div><FontAwesomeIcon size="3x" icon={['fal', 'circle']} className="text-primary"/></div>
            <div className="mt-3">No Gauges found.</div>
          </div>
        )}
        { gauges && (
          <Table size="sm" striped>
            <thead>
              <tr>
                <th style={{width:10}}></th>
                {tableHeadTh}
                <th style={{width:10}}></th>
                <th style={{width:10}}></th>
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
