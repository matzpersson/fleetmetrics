import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetGaugeClass from './AssetGaugeClass';

class DashboardGauge extends Component {
  render() {
    const {
      index,
      openSidePanel,
      cell,
      assets
    } = this.props;

    let assetGauge;
    if (cell.gid && assets) {
      assets.find(asset => {
        return asset.gauges.some(gauge => {
          if (gauge._id === cell.gid) {
            assetGauge = {
              assetKey: asset.key,
              assetId: asset._id,
              assetName: asset.name,
              gauge: gauge
            }
          }
          return false
        })
      });
    }

    return (
      <div >
        { cell.gid && assetGauge && (
          <div>
            <AssetGaugeClass assetGauge={assetGauge} gaugePanelBackground="bg-primary" origin="Dashboard" />
          </div>
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
