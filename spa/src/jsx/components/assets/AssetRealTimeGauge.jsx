import React from 'react';
import { 
  Label
} from 'reactstrap';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import AnimatedNumber from 'react-animated-number';

const AssetRealTimeGauge = (props) => {
  const {
    gauge,
    gaugePanelBackground,
    metric
  } = props;

  let value = 0;
  const modelName = (gauge.modelName ? gauge.modelName : 'no-model');
  const fieldName = gauge.fieldName;
  const maxValue = gauge.maxValue;
  const gaugeType = gauge.gaugeType;
  const suffix = gauge.valueSuffix;
  const decimals = 0;
  const name = (gauge.name ? gauge.name : 'no-name');

  if (metric && metric.sentenceModel === modelName) {
    console.log("FOUND ONE", metric, fieldName, metric.data[fieldName])
    value = parseFloat(metric.data[fieldName]);
  }

  const textValue = `${value.toFixed(decimals)}${suffix}`;

  const prettyString = (n) => {
    return textValue;
  }

  let alertMessage = null;

  // let gaugeColour = '#4285f4';
  let gaugeColour = '#ffffff';
  let gaugePanel = 'bg-primary'

  if (gaugePanelBackground) {
    gaugePanel = gaugePanelBackground
  }

  if (gauge.minAlert > value) {
    alertMessage = 'Alert - value is too LOW';
    gaugeColour = '#ea4335';
    gaugePanel = 'bg-danger';
  }

  if (gauge.maxAlert < value) {
    alertMessage = 'Alert - value is too HIGH';
    gaugeColour = '#ea4335';
    gaugePanel = 'bg-danger';
  }

  console.log(gaugeColour)
  const gaugeTitlePanelClass = `d-flex justify-content-between p-1 ${gaugePanel} text-white rounded-top`
  const gaugeMainPanelClass = `d-flex justify-content-center flex-column border-bottom rounded`

  return (
    <React.Fragment>
      <div className={gaugeMainPanelClass}>
        <div className={gaugeTitlePanelClass}>
          <span>{name}</span>
          {/* <div style={{width: 10, height: 10, borderRadius: 5, backgroundColor: '#34a853'}}></div> */}
          <small className="m-1">{modelName}</small>
        </div>
        <div className="m-2">
          { gaugeType == 'dial' && (
            <CircularProgressbar 

              value={value}
              // text={textValue}
              text={<tspan dx={-20}>{textValue}</tspan>}
              maxValue={maxValue}
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
          )}
          { gaugeType == 'number' && (

              <AnimatedNumber 
                component="text" 
                value={value}
                initialValue={0}
                style={{
                    transition: '0.8s ease-out',
                    fontSize: 48,
                    color: gaugeColour,
                    transitionProperty:
                        'background-color, color, opacity'
                }}
                className=""
                frameStyle={perc => (
                    perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                )}
                duration={300}
                formatValue={n => prettyString(n)}
              />
          )}
        </div>
        { alertMessage && (
          <small className="text-danger" >{alertMessage}</small>
        )}
        <small className="m-1 text-center">12h ago</small>
      </div>
    </React.Fragment>
  );
}

export default AssetRealTimeGauge;
