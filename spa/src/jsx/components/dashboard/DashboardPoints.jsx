import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardPoints = (props) => {
  const {
    selectPoint,
    assets,
    selectedIndex
  } = props;

  const renderDataPoints = (asset) => {
    return asset.gauges.map((gauge, index) =>
      <div key={index} className="p-3 border-bottom border-light text-left" onClick={() => selectPoint(gauge, selectedIndex)}>
        <FontAwesomeIcon icon={['fal', 'arrow-left']} className={'text-primary mr-2'} />
        <span >{gauge.name}</span>
      </div>
    )
  }

  const renderAssets = () => {
    return assets.map((asset, index) =>
      <div key={index}>
        <div className="bg-primary text-white text-left p-2">{asset.name}</div>
        {renderDataPoints(asset)}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div>
        {renderAssets()}
      </div>
    </React.Fragment>
  );
}

export default DashboardPoints;
