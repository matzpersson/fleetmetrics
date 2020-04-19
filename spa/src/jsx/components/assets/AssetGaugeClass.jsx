import React from 'react';
import { connect } from "react-redux";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AnimatedNumber from 'react-animated-number';

class AssetGaugeClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetKey: null,
      gauge: {
        name: '',
        textValue: '',
        modelName: 'n/a',
        fieldName: null,
        valueSuffix: 'm',
        gaugeType: 'number',
        value: 0,
        minValue: 0,
        maxValue: 100,
        minAlert: 30,
        maxAlert: 80,
        alertMessage: null
      }
    };

    this.prettyString = this.prettyString.bind(this);
  }

  prettyString(n) {
    return this.state.gauge.textValue;
  }

  componentDidMount() {
    const {
      assetGauge
    } = this.props;

    const gauge = assetGauge.gauge;
    const assetKey = assetGauge.assetKey;

    gauge.value = 0;
    this.setGauge(gauge);

    this.setState({
      assetKey
    })
  }

  setGauge(gauge){
    gauge.textValue = `${gauge.value.toFixed(gauge.decimals)}${gauge.valueSuffix}`;

    // let gaugeColour = '#4285f4';
    gauge.gaugeColour = '#4285f4';
    gauge.gaugePanel = 'bg-primary'
  
    if (this.props.gaugePanelBackground) {
      gauge.gaugePanel = this.props.gaugePanelBackground
    }

    if (gauge.minAlert > gauge.value) {
      gauge.alertMessage = 'Alert - value is too LOW';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
    }

    if (gauge.maxAlert < gauge.value) {
      gauge.alertMessage = 'Alert - value is too HIGH';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
    }

    console.log("SET GAUGE")
    this.setState({
      gauge
    })
  }

  componentDidUpdate() {
    const {
      metric
    } = this.props.metrics;

    const {
      gauge,
      assetKey
    } = this.state;

    if (metric && metric.sentenceModel === gauge.modelName && metric.topic === assetKey && gauge.fieldName in metric.data) {
      const value = parseFloat(metric.data[gauge.fieldName]);
      if (value !== gauge.value){
        gauge.value = value;
        this.setGauge(gauge);
      }
    }
  }

  render() {
    const {
      gauge
    } = this.state;

    const gaugeMainPanelClass = `d-flex justify-content-center flex-column`
    const gaugeTitlePanelClass = `d-flex justify-content-between p-1 ${gauge.gaugePanel} text-white border-bottom border-secondary`

    return (
      <div className={gaugeMainPanelClass}>
        <div className={gaugeTitlePanelClass}>
          <span>{gauge.name}</span>
          {/* <div style={{width: 10, height: 10, borderRadius: 5, backgroundColor: '#34a853'}}></div> */}
          <small className="m-1">{gauge.modelName}</small>
        </div>
        <div className="m-2">
          { gauge.gaugeType === 'dial' && (
            <CircularProgressbar 

              value={gauge.value}
              // text={textValue}
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
          )}
          { gauge.gaugeType === 'number' && (

              <AnimatedNumber 
                component="text" 
                value={gauge.value}
                initialValue={0}
                style={{
                    transition: '0.8s ease-out',
                    fontSize: 48,
                    color: gauge.gaugeColour,
                    transitionProperty:
                        'background-color, color, opacity'
                }}
                className=""
                frameStyle={perc => (
                    perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                )}
                duration={300}
                formatValue={n => this.prettyString(n)}
              />
          )}
        </div>
        { gauge.alertMessage && (
          <small className="text-danger" >{gauge.alertMessage}</small>
        )}
        <small className="m-1 text-center">12h ago</small>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    metrics: store.metrics
  }
}

export default connect(mapStoreToProps)(AssetGaugeClass);

