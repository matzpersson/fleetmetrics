import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { 
  Table,
  Card
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../../actions/assets';
import AssetPointsTable from './AssetPointsTable';

class Assets extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAssets());
  }

  renderRows(headers, row) {
    let iconName = 'circle';
    let iconColour = "text-success mr-3"

    const tableTd = headers.map((header, index) => {
      let cellValue = null;

      switch (header.field) {
        case 'models':
          cellValue = (header.field.length > 0 ? `${row[header.field].length} models` : '0 models' );
          break;
        case 'gauges':
          cellValue = (header.field.length > 0 ? `${row[header.field].length} pts` : '0 pts' );
          break;
        default:
          cellValue = row[header.field]
      }
      return (<td key={index}>{cellValue}</td>)
    });

    return tableTd;
  }

  remove() {
    const {
      currentUser
    } = this.props.users;

  }

  create() {
    const {
      currentUser
    } = this.props.users;

  }

  render() {
    const {
      rows
    } = this.props.assets;

    const {
      currentUser
    } = this.props.users;

    const canEdit = currentUser.permissions.find(permission => permission.tag === 'putAssets') || false;
    const canRemove = currentUser.permissions.find(permission => permission.tag === 'deleteAssets') || false;

    const headers = [
      {caption: 'Name', field: 'name'},
      {caption: 'Key', field: 'key'},
      {caption: '# Model', field: 'models'},
      {caption: '# Data Points', field: 'gauges'},
      {caption: 'Stream Type', field: 'sentenceType'},
    ]

    const tableHeadTh = headers.map((header, index) =>
      <th key={index}>{header.caption}</th>
    );
    
    let tableBodyTr = (<tr><td colSpan="5" className="p-2 text-center">No Assets found</td></tr>);
    if (rows) {
      tableBodyTr = rows.map((asset, index) => {
        const link = `/asset/${asset._id}`
        return(
          <tr key={index} >
            <td><FontAwesomeIcon icon={['fal', 'circle']} className={'text-success'} /></td>
            {this.renderRows(headers, asset)}
            <td>{ canRemove && (<FontAwesomeIcon icon={['fal', 'trash']} className={'text-danger'} />)}</td>
            <td><Link to={link} ><FontAwesomeIcon icon={['fal', 'tachometer']} className={'text-warning'} /></Link></td>
            <td>{ canEdit && (<Link to={link} ><FontAwesomeIcon icon={['fal', 'edit']} className={'text-primary'} /></Link>)}</td>
          </tr>
        )
      });
    }

    return (
      <div className="p-3">
        <div className='ml-2 mt-2'>
          <h3 className="text-primary border-light border-bottom"><FontAwesomeIcon icon={['fal','cube']} className="mr-3" />Assets</h3>
          <p className='m-0'>Asset Management showing individual devices, there sentence streams.</p>
        </div>
        <div className="d-flex justify-content-end mt-0">
          <div>
            <FontAwesomeIcon icon={['fal','layer-group']} className="m-2 text-primary" title="Manage Asset groups" onClick={() => alert("Placeholder Only")} />
            <FontAwesomeIcon icon={['fal','plus']} className="m-2 text-primary" title="Add" onClick={() => alert("Placeholder Only")} />
            <FontAwesomeIcon icon={['fal','filter']} className="m-2 text-primary" title="Filter" onClick={() => alert("Placeholder Only")}  />
          </div>
        </div>
        <div className="rounded border p-2">
          <Table size="sm" striped>
            <thead>
              <tr>
                <th style={{width:10}}></th>
                {tableHeadTh}
                <th style={{width:30}}></th>
                <th style={{width:10}}></th>
                <th style={{width:10}}></th>
              </tr>
            </thead>
            <tbody>
              {tableBodyTr}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    assets: store.assets,
    users: store.users,
  }
}

export default connect(mapStoreToProps)(Assets);
