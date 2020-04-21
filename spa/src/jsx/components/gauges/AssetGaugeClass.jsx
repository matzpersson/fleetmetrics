import React from 'react';
import { connect } from "react-redux";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AnimatedNumber from 'react-animated-number';
import GaugeProgress from './GaugeProgress';
import GaugeNumber from './GaugeNumber';

class AssetGaugeClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetKey: null,
      assetName: null,
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
        alertMessage: null,
        gaugeColour: '#4285f4',
        gaugePanel: 'bg-primary'
      }
    };

    this.selectGauge = this.selectGauge.bind(this);
  }

  componentDidMount() {
    const {
      assetGauge
    } = this.props;

    console.log("ASSET GAUGE", assetGauge)
    const gauge = assetGauge.gauge;
    const assetKey = assetGauge.assetKey;
    const assetName = assetGauge.assetName;

    if (this.props.gaugePanelBackground) {
      gauge.gaugePanel = this.props.gaugePanelBackground
    }

    gauge.value = 0;
    this.setGauge(gauge);

    this.setState({
      assetKey,
      assetName,
    })
  }

  setGauge(gauge){
    gauge.textValue = `${gauge.value.toFixed(gauge.decimals)}${gauge.valueSuffix}`;
    // gauge.gaugeColour = '#4285f4';
    // gauge.gaugePanel = 'bg-primary';

    // console.log("SET GAUGE", this.props.origin, this.props.gaugePanelBackground);
    // if (this.props.gaugePanelBackground) {
    //   gauge.gaugePanel = this.props.gaugePanelBackground
    // }

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

    this.setState({
      gauge
    })
  }

  selectGauge(type) {
    const {
      gauge
    } = this.state;

    switch (type) {
      case 'dial':
        return (<GaugeProgress gauge={gauge} />);
      case 'number':
        return (<GaugeNumber gauge={gauge} />);
      default: break;
    }
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
      gauge,
      assetName
    } = this.state;

    const gaugeMainPanelClass = `d-flex justify-content-center flex-column`;
    const gaugeTitlePanelClass = `d-flex justify-content-between p-1 ${gauge.gaugePanel} text-white border-bottom border-secondary`;

    return (
      <div className={gaugeMainPanelClass}>
        <div className={gaugeTitlePanelClass}>
          <span>{gauge.name}</span>
          <small className="m-1">{assetName}</small>
        </div>
        <div className="m-2">
          {this.selectGauge(gauge.gaugeType)}
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
