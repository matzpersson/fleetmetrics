import React from 'react';
import { connect } from "react-redux";
import GaugeProgress from '../gauges/GaugeProgress';
import GaugeNumber from '../gauges/GaugeNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartLine from '../charts/ChartLine';
import ChartBar from '../charts/ChartBar';
import { fetchMetricsModelRange } from '../../actions/metrics';
import { HalfCircleSpinner } from 'react-epic-spinners';

class AssetDataPoint extends React.Component {
  constructor(props) {
    super(props)

    const now = new Date()
    this.state = {
      assetKey: null,
      assetName: null,
      wrap: 'cell',
      showChart: null,
      chart: {
        fromDate: new Date(now - (1000 * 60 * 60 * 24 * 1)),
        toDate: now,
        data: [],
        type: 'bar'
      },
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
    this.refreshChart = this.refreshChart.bind(this);
  }

  toggleChart() {
    const {
      assetKey,
      gauge,
      chart
    } = this.state;

    this.setState({
      showChart: !this.state.showChart
    },
      () => {if (this.state.showChart) this.props.dispatch(fetchMetricsModelRange(assetKey, gauge.modelName, chart.fromDate.toISOString(), chart.toDate.toISOString()))}
    )
  }

  componentDidMount() {
    let {
      assetGauge,
      wrap
    } = this.props;

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
      gauge.default = (gauge.default ? gauge.default : 'gauge');
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
      metric,
      ranges,
      fetching,
      fetched
    } = this.props.metrics;

    const {
      gauge,
      assetKey,
      showChart,
      chart
    } = this.state;

    if (metric && metric.sentenceModel === gauge.modelName && metric.topic === assetKey && gauge.fieldName in metric.data) {
      const value = parseFloat(metric.data[gauge.fieldName]);
      if (value !== gauge.value){
        gauge.value = value;
        this.setGauge(gauge);
      }
    }

    if (showChart) {
      const range = ranges.find(range => range.topic === assetKey && range.model === gauge.modelName); 
      if (range && range.data !== chart.data) {
        chart.data = range.data
        this.setState({
          chart
        })
      }
    }

  }

  refreshChart() {
    let {
      gauge,
      chart,
      assetKey
    } = this.state;

    this.props.dispatch(fetchMetricsModelRange(assetKey, gauge.modelName, chart.fromDate.toISOString(), chart.toDate.toISOString()));
  }

  setGauge(gauge){
    const {
      assetGauge
    } = this.props;

    let {
      showChart,
      chart
    } = this.state;

    const assetKey = assetGauge.assetKey;
    const assetName = assetGauge.assetName;

    // Set defaults. Load model range if applicable
    const showChartDefault = (gauge.default === 'chart' ? true : false);
    if (showChart === null) {
      showChart = showChartDefault;
      if (showChart === true) {
        this.props.dispatch(fetchMetricsModelRange(assetKey, gauge.modelName, chart.fromDate.toISOString(), chart.toDate.toISOString()));
      }
    }

    gauge.textValue = `${gauge.value.toFixed(gauge.decimals)}${gauge.valueSuffix}`;
    gauge.gaugeColour = '#4285f4';
    gauge.gaugePanel = 'bg-primary';
    gauge.alertMessage = null;

    // Set background if passed in
    if (this.props.gaugePanelBackground) {
      gauge.gaugePanel = this.props.gaugePanelBackground
    }

    // Set Min Alert
    if (gauge.minAlert > gauge.value && gauge.minAlert != -1) {
      gauge.alertMessage = 'Alert - value is too LOW';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
    } 

    // Set Max Alert
    if (gauge.maxAlert < gauge.value && gauge.maxAlert != -1) {
      gauge.alertMessage = 'Alert - value is too HIGH';
      gauge.gaugeColour = '#ea4335';
      gauge.gaugePanel = 'bg-danger';
    }

    this.setState({
      gauge,
      assetKey,
      assetName,
      showChart
    })
  }

  selectGauge(type) {
    const {
      gauge
    } = this.state;

    switch (type) {
      // case 'dial':
      //   return (<GaugeProgress gauge={gauge} />);
      // case 'number':
      //   return (<GaugeNumber gauge={gauge}/>);
      default:
        return (<GaugeNumber gauge={gauge}/>);
    }
  }

  selectChart(type) {
    const {
      chart
    } = this.state;

    switch (type) {
      case 'line':
        return (<ChartLine chart={chart} />);
      case 'bar':
        return (<ChartBar chart={chart} />);
      default: 
        return (<ChartBar chart={chart} />);
      ;
    }
  }

  selectWrap(wrap) {
    const {
      gauge,
      assetName,
      showChart
    } = this.state;

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
                { showChart && (
                  <FontAwesomeIcon icon={['fal','redo']} className="mr-2" onClick={() => this.refreshChart()}/>
                )}

                <FontAwesomeIcon icon={['fal',(showChart ? 'tachometer-fast' : 'chart-line')]} className="mr-2" onClick={() => this.toggleChart()}/>
                <FontAwesomeIcon icon={['fal','times']} className="mr-1" onClick={() => this.props.close()}/>
              </span>
            </div>

            {(showChart ? this.selectChart(gauge.chartType) : this.selectGauge(gauge.gaugeType))}

            <div className="p-1">
              { gauge.alertMessage && (
                <small className="text-danger" >{gauge.alertMessage}</small>
              )}
              <small className="ml-2">{assetName} - 12h ago</small>
            </div>
          </div>
          )
      default: return;
    }
  }

  render() {
    const {
      wrap
    } = this.state;

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

export default connect(mapStoreToProps)(AssetDataPoint);
