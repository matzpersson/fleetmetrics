import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DashboardGauge extends Component {
  render() {
    const {
      index,
      openSidePanel,
      cell
    } = this.props;

    return (
      <div >
        { cell.gid && (
          <div>{cell.gid}</div>
        )}
        { !cell.gid && (
          <span className="text">
            <FontAwesomeIcon icon={['fal','plus']} className="mt-5 text-secondary mb-3" size="4x" onClick={() => openSidePanel(index)}/>
          </span>
        )}

      </div>
    );
  }
}

export default DashboardGauge;
