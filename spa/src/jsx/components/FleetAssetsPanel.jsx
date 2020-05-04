import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssetDataPoint from './assets/AssetDataPoint';

const FleetAssetsPanel = (props) => {
  const {
    assets,
    gauges,
    toggleFeature,
    toggleCollapseTopic,
    assetMeta
  } = props;

  const renderGauges = (asset) => {
    if (asset && assetMeta && !assetMeta[asset.key].collapsed) {
      // const points = gauges.rows.showInMenu.filter(gauge => gauge.assetId === asset._id)
      const realtimePoints = asset.gauges.map((gauge, index) => {
        const assetGauge={
          assetKey: asset.key,
          assetId: asset._id,
          assetName: asset.name,
          gauge: gauge
        }
        return (
          <div key={index} style={{backgroundColor: '#333333', marginBottom: 1}} >
            <AssetDataPoint assetGauge={assetGauge} wrap="row"/>
          </div>
        )
      });
      return (realtimePoints);
    }
  }

  const assetsGauges = assets.rows.map((asset, index) =>
    <div key={index}>
      <div className="mt-2 p-2 d-flex justify-content-between bg-primary" style={{backgroundColor:'#222222'}}>
        <FontAwesomeIcon icon={['fal','eye']} onClick={() => toggleFeature(asset.key)}/>
        <small className="">{asset.name.toUpperCase()}</small>
        <FontAwesomeIcon icon={['fal',(assetMeta && assetMeta[asset.key].collapsed ? 'plus' : 'minus')]} onClick={() => toggleCollapseTopic(asset.key)}/>
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
