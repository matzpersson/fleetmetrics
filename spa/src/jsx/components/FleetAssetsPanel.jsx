import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetDataPoint from './assets/AssetDataPoint';

const FleetAssetsPanel = (props) => {
  const {
    assets,
    gauges
  } = props;

  const renderGauges = (asset) => {
    if (gauges) {
      const points = gauges.rows.showInMenu.filter(gauge => gauge.assetId === asset._id)
      const realtimePoints = points.map((gauge, index) =>
        <div key={index} style={{backgroundColor: '#333333', marginBottom: 1}} >
          <AssetDataPoint assetGauge={gauge} wrap="row"/>
        </div>
      );
      return (realtimePoints);
    }
  }

  const assetsGauges = assets.rows.map((asset, index) =>
    <div key={index} className="rounded" >
      <div className="mt-2 p-2 d-flex justify-content-between bg-primary" style={{backgroundColor:'#222222'}}>
        <FontAwesomeIcon icon={['fal','eye']} />
        <small className="">{asset.name.toUpperCase()}</small>
        <FontAwesomeIcon icon={['fal','minus']} />
      </div>
      {renderGauges(asset)}
    </div>
  )

  return (
    <React.Fragment>
      <div>{assetsGauges}</div>
    </React.Fragment>
  );
}

export default FleetAssetsPanel;
