import React from 'react';
import { 
  Label
} from 'reactstrap';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const AssetRealTimeGauge = (props) => {
  const {
    asset,
    handleChange,
    onCancel,
    onSave,
    tabId
  } = props;

  const value = 12;
  const maxValue = 50;
  
  return (
    <React.Fragment>
      <CircularProgressbar 
        className="border border-primary rounded p-2"
        value={value}
        text={`${value}%`}
        maxValue={maxValue}
        circleRatio={0.75}
        styles={buildStyles({
          rotation: 1 / 2 + 1 / 8,
          strokeLinecap: 'butt',
          pathTransitionDuration: 1.5,
          textTransitionDuration: 1.5,
          trailColor: '#cccccc',
          pathColor: '#4285f4',
          textColor: '#4285f4'
        })}
      />
    </React.Fragment>
  );
}

export default AssetRealTimeGauge;
