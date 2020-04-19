import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import _ from "lodash";

const ResponsiveGridLayout = WidthProvider(RGL);

class Dashboard extends Component {
  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    // const layout = {0: [0,2,3,4]}
    const layout = [
      {i: "1", x: 0, y: 0, w: 6, h: 4},
      {i: "2", x: 6, y: 0, w: 6, h: 4},
      {i: "3", x: 2, y: 2, w: 1, h: 4}
    ];
    // const layout = this.generateLayout();
    this.state = { layout };
  }

  onLayoutChange (layout) {
    this.props.onLayoutChange(layout);
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} className="react-grid-layout-panel">
          <span className="text">{i}</span>
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
  
  render() {
    // const layout = [
    //   {i: 1, x: 0, y: 0, w: 6, h: 4},
    //   {i: 2, x: 6, y: 0, w: 6, h: 4},
    //   {i: 3, x: 2, y: 2, w: 1, h: 4}
    // ];

    const layout = {0: [0,2,3,4]}

    const layouts = {lg: layout};
    const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};
    const cols = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2};

    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','grip-horizontal']} className="mt-5 text-danger mb-3" size="4x" />
        <h1>FleetMetrics Dashboard</h1>

        <ResponsiveGridLayout 
          className="layout"
          layouts={layouts}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          >
          {/* {this.generateDOM()} */}
          <div key={1} className="react-grid-layout-panel">
            <span className="text">{1}</span>
          </div>
          <div key={2} className="react-grid-layout-panel">
            <span className="text">{2}</span>
          </div>
          <div key={3} className="react-grid-layout-panel">
            <span className="text">{3}</span>
          </div>
        </ResponsiveGridLayout>
      </div>
    );
  }
}

export default Dashboard;

