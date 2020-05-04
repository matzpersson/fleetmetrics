import React from 'react';
import { 
  Table,
  TabPane,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const AssetPointsTab = (props) => {
  let {
    asset,
    currentUser,
    onDeletePoint
  } = props;

  const headers = [
    {caption: 'Name', field: 'name'},
    {caption: 'Model', field: 'model'},
    {caption: 'Type', field: 'gaugeType'},
    {caption: 'Min', field: 'minValue'},
    {caption: 'Max', field: 'maxValue'},
    {caption: 'Alert Low', field: 'minAlert'},
    {caption: 'Alert High', field: 'maxAlert'},
  ]

  const renderRows = (headers, row) => {
    const tableTd = headers.map((header, index) => {
      let cellValue = row[header.field];
      return (<td key={index}>{cellValue}</td>)
    });

    return tableTd;
  }

  const tableHeadTh = headers.map((header, index) =>
    <th key={index}>{header.caption}</th>
  );

  const baseUrl = `/asset/${asset._id}/points`;
  const newLink = `${baseUrl}/new`

  let tableBodyTr = (
    <div className="p-5 text-center">
      <div><FontAwesomeIcon size="3x" icon={['fal', 'circle']} className="text-primary"/></div>
      <div className="mt-3">No Data Points found.</div>
    </div>
  )

  const canView = currentUser.permissions.find(permission => permission.tag === 'getAssets') || false;
  const canCreate = currentUser.permissions.find(permission => permission.tag === 'postAssets') || false;
  const canRemove = currentUser.permissions.find(permission => permission.tag === 'deleteAssets') || false;

  if (asset && asset.gauges) {
    tableBodyTr = asset.gauges.map((gauge, index) => {
      let iconName = "circle";
      const link = `${baseUrl}/${gauge._id}`;

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
        <td>{ canRemove && (<FontAwesomeIcon icon={['fal', 'trash']} className={'text-danger'} onClick={() => onDeletePoint(gauge._id)}/>)}</td>
      </tr>)
    })
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default AssetPointsTab;
