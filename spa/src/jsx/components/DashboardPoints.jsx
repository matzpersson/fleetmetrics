import React from 'react';
import { 
  Label
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const DashboardPoints = (props) => {
  const {
    selectPoint,
    assets,
    selectedIndex
  } = props;

  console.log("assets", assets)

  const renderDataPoints = (asset) => {
    return asset.gauges.map((gauge, index) =>
      <div className="p-3 border-bottom border-light text-left" onClick={() => selectPoint(gauge, selectedIndex)}>
        <FontAwesomeIcon icon={['fal', 'arrow-left']} className={'text-primary mr-2'} />
        <span >{gauge.name}</span>
      </div>
    )
  }

  const renderAssets = () => {
    return assets.map((asset, index) =>
      <div>
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
