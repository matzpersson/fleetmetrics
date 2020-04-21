import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AnimatedNumber from 'react-animated-number';

const GaugeProgress = (props) => {
  const {
    gauge
  } = props;

  return (
    <React.Fragment>
      <div className="h-100">
        <CircularProgressbar
          value={gauge.value}
          text={<tspan dx={-20}>{gauge.textValue}</tspan>}
          maxValue={gauge.maxValue}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            pathTransitionDuration: 1.5,
            textTransitionDuration: 1.5,
            trailColor: '#cccccc',
            pathColor: '#4285f4',
            textColor: '#4285f4',
            textSize: '24px'
          })}
        />
      </div>
    </React.Fragment>
  )
}

export default GaugeProgress;
