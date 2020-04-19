import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlidingPanel from 'react-sliding-side-panel';
import { connect } from "react-redux";
import { saveUser } from "../actions/users"

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    items: 3,
    rowHeight: 30,
    // onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    // const layout = [
    //   {i: "0", x: 0, y: 0, w: 2, h: 4},
    //   {i: "1", x: 2, y: 0, w: 2, h: 4},
    //   {i: "2", x: 4, y: 0, w: 2, h: 4},
    //   {i: "3", x: 6, y: 0, w: 2, h: 4},
    //   {i: "4", x: 8, y: 0, w: 2, h: 4},
    //   {i: "5", x: 10, y: 0, w: 2, h: 4},
    //   {i: "6", x: 0, y: 4, w: 6, h: 4},
    //   {i: "7", x: 6, y: 4, w: 6, h: 4},
    //   {i: "8", x: 0, y: 8, w: 12, h: 6},
    //   {i: "9", x: 0, y: 14, w: 12, h: 6},
    //   {i: "10", x: 0, y: 20, w: 2, h: 4},
    //   {i: "11", x: 2, y: 20, w: 2, h: 4},
    //   {i: "12", x: 4, y: 20, w: 2, h: 4},
    //   {i: "13", x: 6, y: 20, w: 2, h: 4},
    //   {i: "14", x: 8, y: 20, w: 2, h: 4},
    //   {i: "15", x: 10, y: 20, w: 2, h: 4},
    // ];


    this.state = { 
      layout: [],
      sidePanelOpen: false
    };
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }

  toggleSidePanel() {
    this.setState({sidePanelOpen: !this.state.sidePanelOpen})
  }

  generateDOM() {
    const toggleSidePanel = this.toggleSidePanel;
    // return _.map(_.range(this.props.items), function(i) {
    return this.state.layout.map((cell, i) => {
      return (
        <div key={i} className="react-grid-layout-panel">
          <span className="text">
            <FontAwesomeIcon icon={['fal','plus']} className="mt-5 text-primary mb-3" size="4x" onClick={toggleSidePanel}/>
          </span>
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

  onLayoutChange(layout) {
    const {
      authUser
    } = this.props.users;

    console.log("CHANGED layout", layout)
    authUser.dashboard = layout
    this.props.dispatch(saveUser(authUser));
  }

  setLayout() {
    const {
      authUser
    } = this.props.users;

    console.log("did update")
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
    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','grip-horizontal']} className="mt-5 text-primary mb-3" size="4x" />
        <h1>FleetMetrics Dashboard</h1>
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
          <div className="bg-light h-100">
            <div>My Panel Content</div>
            <button onClick={this.toggleSidePanel}>close</button>
          </div>
        </SlidingPanel>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    users: store.users,
  }
}

export default connect(mapStoreToProps)(BasicLayout);