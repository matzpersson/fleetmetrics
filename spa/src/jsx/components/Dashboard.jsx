import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlidingPanel from 'react-sliding-side-panel';
import { connect } from 'react-redux';
import { saveUser } from '../actions/users'
import DashboardPoints from './DashboardPoints';
import DashboardGauge from './gauges/DashboardGauge';
import { 
  Button
} from 'reactstrap';

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends React.Component {
  static defaultProps = {
    className: 'layout',
    items: 3,
    rowHeight: 30,
    isDraggagle: true,
    isResizable: true,
    maxH: 12,
    maxW: 12,
    minH: 1,
    minW: 1,
    // onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    this.state = { 
      layout: [],
      sidePanelOpen: false,
      selectedIndex: null,
      gaugeList: []
    };
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
    this.openSidePanel = this.openSidePanel.bind(this);
    this.selectPoint = this.selectPoint.bind(this);
  }

  openSidePanel(selectedIndex) {
    this.setState({
      sidePanelOpen: true,
      selectedIndex
    })
  }

  toggleSidePanel() {
    this.setState({sidePanelOpen: !this.state.sidePanelOpen})
  }

  selectPoint(gauge, index) {
    const {
      layout,
      gaugeList
    } = this.state;

    layout[index]['gid'] = gauge._id
    console.log('picked one', gauge, index, layout[index])

    this.setState({
      layout
    })

    this.toggleSidePanel()
  }

  generateDOM() {
    const openSidePanel = this.openSidePanel;
    return this.state.layout.map((cell, index) => {
      return (
        <div key={index} className="react-grid-layout-panel">
          <DashboardGauge openSidePanel={openSidePanel} index={index} cell={cell} assets={this.props.assets.rows} />
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(newLayout) {
    console.log("UPDATING LAYOUT")
    const {
      authUser,
    } = this.props.users;

    const dashboard = newLayout.map((cell, index) => {
      cell.gid = this.state.layout[index].gid;
      return cell;
    })

    console.log("CHANGED layout", dashboard, newLayout)
    authUser.dashboard = dashboard
    this.props.dispatch(saveUser(authUser));
  }

  saveLayout() {
    // const {
    //   authUser,
    // } = this.props.users;

    // const dashboard = newLayout.map((cell, index) => {
    //   cell.gid = this.state.layout[index].gid;
    //   return cell;
    // })

    // console.log("CHANGED layout", this.state.layout, newLayout)
    // authUser.dashboard = newLayout
    // this.props.dispatch(saveUser(authUser));
  }

  setLayout() {
    const {
      authUser
    } = this.props.users;

    if (this.state.layout !== authUser.dashboard) {
      this.setState({
        layout: authUser.dashboard
      })
    }
  }

  componentDidUpdate() {
    this.setLayout()
  }

  componentDidMount() {
    this.setLayout()
  }

  render() {
    const {
      rows
    } = this.props.assets;

    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','grip-horizontal']} className="mt-5 text-primary mb-3" size="4x" />
        <h1>FleetMetrics Dashboard</h1>
        {/* <Button onClick={this.saveLayout()}>Save Changes</Button> */}

        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={(layout) => this.onLayoutChange(layout)}
          {...this.props}
        >
          {this.generateDOM()}
        </ReactGridLayout>
        <SlidingPanel
          type={'right'}
          isOpen={this.state.sidePanelOpen}
          size={20}
        >
          <div className="bg-white h-100">
            <div className="d-flex justify-content-between p-2">
              <span>Select Datapoint...</span>
              <FontAwesomeIcon icon={['fal', 'backspace']} className={'text-danger mr-2'} onClick={this.toggleSidePanel}/>
            </div>
            <DashboardPoints toggleSidePanel={this.toggleSidePanel} assets={rows} selectPoint={this.selectPoint} selectedIndex={this.state.selectedIndex} />
          </div>
        </SlidingPanel>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    users: store.users,
    assets: store.assets
  }
}

export default connect(mapStoreToProps)(Dashboard);
