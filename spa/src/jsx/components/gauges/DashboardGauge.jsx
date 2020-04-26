import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetGaugeClass from './AssetGaugeClass';
import { 
  Row
} from 'reactstrap';

class DashboardGauge extends Component {
  render() {
    const {
      index,
      openSidePanel,
      cell,
      assets,
      closeGauge
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
      <div className="h-100 d-flex justify-content-center">
        { cell.gid && assetGauge && (
          <AssetGaugeClass assetGauge={assetGauge} gaugePanelBackground="bg-primary" close={() => closeGauge(index)} />
        )}
        { !cell.gid && (
          <FontAwesomeIcon icon={['fal','plus']} style={{color: '#cccccc'}} className="row align-self-center" size="4x" onClick={() => openSidePanel(index)}/>
        )}
      </div>
    );
  }
}

export default DashboardGauge;
