import React from 'react';
import { connect } from "react-redux";
import GaugeProgress from './GaugeProgress';
import GaugeNumber from './GaugeNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartTinyLine from '../charts/ChartTinyLine';
import ChartLine from '../charts/ChartLine';

class AssetGaugeClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetKey: null,
      assetName: null,
      wrap: 'cell',
      showChart: false,
      chart: null,
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
    this.selectWrap = this.selectWrap.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
  }

  toggleChart() {
    this.setState({
      showChart: !this.state.showChart
    })
  }

  componentDidMount() {
    let {
      assetGauge,
      wrap
    } = this.props;

    // console.log("ASSET GAUGE", assetGauge)
    const gauge = assetGauge.gauge;
    const assetKey = assetGauge.assetKey;
    const assetName = assetGauge.assetName;
    
    if (!wrap) {
      wrap = 'cell';
    }

    if (this.props.gaugePanelBackground) {
      gauge.gaugePanel = this.props.gaugePanelBackground
    }

    if (gauge) {
      gauge.value = 0;
    }

    this.setGauge(gauge);
  
    this.setState({
      assetKey,
      assetName,
      wrap
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

    // if (metric){
    //   console.log("CHANGED", metric.sentenceModel, gauge.modelName, metric.topic, metric.topic, gauge.fieldName, metric.data)
    // }

    if (metric && metric.sentenceModel === gauge.modelName && metric.topic === metric.topic && gauge.fieldName in metric.data) {
      const value = parseFloat(metric.data[gauge.fieldName]);
      if (value !== gauge.value){
        gauge.value = value;
        this.setGauge(gauge);
      }
    }
  }

  setGauge(gauge){
    const {
      assetGauge
    } = this.props;

    const assetKey = assetGauge.assetKey;
    const assetName = assetGauge.assetName;

    gauge.textValue = `${gauge.value.toFixed(gauge.decimals)}${gauge.valueSuffix}`;
    gauge.gaugeColour = '#4285f4';
    gauge.gaugePanel = 'bg-primary';
    gauge.alertMessage = null;

    // console.log("SET GAUGE", this.props.gaugePanelBackground);
    if (this.props.gaugePanelBackground) {
      gauge.gaugePanel = this.props.gaugePanelBackground
    }

    if (gauge.minAlert > gauge.value && gauge.minAlert != -1) {
      gauge.alertMessage = 'Alert - value is too LOW';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
      console.log("set low")
    } 

    if (gauge.maxAlert < gauge.value && gauge.maxAlert != -1) {
      gauge.alertMessage = 'Alert - value is too HIGH';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
      console.log("set high")
    }

    this.setState({
      gauge,
      assetKey,
      assetName,
    })
  }

  selectGauge(type) {
    const {
      gauge,
      width,
      height
    } = this.state;

    switch (type) {
      case 'dial':
        return (<GaugeProgress gauge={gauge} />);
      case 'number':
        return (<GaugeNumber gauge={gauge}/>);
      default: break;
    }
  }

  selectChart(type) {
    const {
      gauge
    } = this.state;

    return (<ChartTinyLine />)
    // switch (type) {
    //   case 'dial':
    //     return (<GaugeProgress gauge={gauge} />);
    //   case 'number':
    //     return (<GaugeNumber gauge={gauge}/>);
    //   default: break;
    // }
  }

  selectWrap(wrap) {
    const {
      gauge,
      assetName,
      showChart
    } = this.state;

    const gaugeMainPanelClass = `d-flex justify-content-center flex-column h-100 flex-column`;
    const gaugeTitlePanelClass = `d-flex justify-content-between p-1 ${gauge.gaugePanel} text-white border-bottom border-secondary flex-grow-0`;

    switch(wrap) {
      case 'row':
        return (
          <div className="d-flex justify-content-between p-2">
            <span style={{fontSize: 12}}>{gauge.name}</span>
            <GaugeNumber gauge={gauge} fontSize={12}/>
          </div>
        )
      case 'cell':
        return (
          <div className="d-flex justify-content-between flex-column h-100">
            <div className={gaugeTitlePanelClass} style={{fontSize: 14}}>
              <span>{gauge.name}</span>
              <span>
                <FontAwesomeIcon icon={['fal',(showChart ? 'tachometer-fast' : 'chart-line')]} className="mr-2" onClick={() => this.toggleChart()}/>
                <FontAwesomeIcon icon={['fal','times']} className="mr-1" onClick={() => this.props.close()}/>
              </span>
            </div>

            {(showChart ? this.selectChart(gauge.gaugeType) : this.selectGauge(gauge.gaugeType))}

            <div className="p-1">
              { gauge.alertMessage && (
                <small className="text-danger" >{gauge.alertMessage}</small>
              )}
              <small className="ml-2">{assetName} - 12h ago</small>
            </div>
          </div>
          )
      case 'cell2':
        return (
          <div className={gaugeMainPanelClass}>
            <div className={gaugeTitlePanelClass} style={{fontSize: 14}}>
              <span>{gauge.name}</span>
              <span>
                <FontAwesomeIcon icon={['fal',(showChart ? 'tachometer-fast' : 'chart-line')]} className="mr-3" onClick={() => this.toggleChart()}/>
                <FontAwesomeIcon icon={['fal','times']} className="mr-1" onClick={() => this.props.close()}/>
              </span>
            </div>
            <div className="m-1 flex-grow-1 d-flex justify-content-center h-100">
              {/* <div className="row align-self-center">{this.selectChart(gauge.gaugeType)}</div> */}

                {(showChart ? this.selectChart(gauge.gaugeType) : this.selectGauge(gauge.gaugeType))}

            </div>
            { gauge.alertMessage && (
              <small className="text-danger" >{gauge.alertMessage}</small>
            )}
            <small className="m-1 p-1 text-center flex-grow-0">{assetName} - 12h ago</small>
          </div>
        )

      default: return;
    }
  }


  render() {
    const {
      // gauge,
      // assetName,
      wrap
    } = this.state;

    // const gaugeMainPanelClass = `d-flex justify-content-center flex-column`;
    // const gaugeTitlePanelClass = `d-flex justify-content-between p-1 ${gauge.gaugePanel} text-white border-bottom border-secondary`;

    return (
      <div className="h-100 w-100">
        {this.selectWrap(wrap)}
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
