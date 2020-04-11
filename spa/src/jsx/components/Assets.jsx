import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { 
  Table,
} from 'reactstrap';
import { fetchAssets } from '../actions'

class Assets extends Component {
  constructor(props) {
    super(props)

    this.state = {
      icons: {
        indpt: 'water-lower',
        inmwv: 'wind',
        gpgll: 'map-marker',
        gphdt: 'compass'
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchAssets());
  }

  renderRows(headers, row) {
    let iconName = (this.state.icons[row.sentenceModel] ? this.state.icons[row.sentenceModel] : 'circle');
    let iconColour = "text-success mr-3"

    const tableTd = headers.map((header, index) => {
      const cellValue = (header.field === 'data' ? JSON.stringify(row[header.field]) : row[header.field] );
      return (<td key={index}>{(index === 0 ? <FontAwesomeIcon icon={['fal', iconName]} className={iconColour} /> : null)}{cellValue}</td>)
    });

    return tableTd;
  }

  render() {
    const {
      metric,
      rows
    } = this.props.metrics;

    const headers = [
      {caption: 'Name', field: 'name'},
      {caption: 'Models', field: 'models'},
      {caption: 'Stream Type', field: 'sentenceType'},
      {caption: 'Metric Watch', field: 'data'},
    ]

    const tableHeadTh = headers.map((header, index) =>
      <th key={index}>{header.caption}</th>
    );
    
    let tableBodyTr = (<tr><td colspan="5" className="p-2 text-center">No Assets found</td></tr>);
    // if (metric) {
    //   tableBodyTr = rows.slice(0, 30).map((row, index) =>
    //     <tr key={index} >
    //       {this.renderRows(headers, row)}
    //     </tr>
    //   );
    // }

    return (
      <div className="p-3">
        <div className='ml-2 mt-2'>
          <h3 className="text-primary border-light border-bottom"><FontAwesomeIcon icon={['fal','box']} className="mr-3" />Assets</h3>
          <p className='m-0'>Asset Management showing individual devices, there sentence streams.</p>
        </div>
        <div className="d-flex justify-content-end mt-0">
          <div>
            <FontAwesomeIcon icon={['fal','layer-group']} className="m-2 text-primary" title="Manage Asset groups" />
            <FontAwesomeIcon icon={['fal','plus']} className="m-2 text-primary" title="Add" />
            <FontAwesomeIcon icon={['fal','filter']} className="m-2 text-primary" title="Filter" />
            <FontAwesomeIcon icon={['fal','download']} className="m-2 text-primary" title="Export" />
          </div>
        </div>
        <div className="rounded border p-2">
          <Table size="sm" striped>
            <thead>
              <tr>
                {tableHeadTh}
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
    metrics: store.metrics
  }
}

export default connect(mapStoreToProps)(Assets);
