import React, { useState } from 'react';
import { connect } from "react-redux";
import Ol from "./FleetMap";

class Fleet extends React.Component {
  constructor() {
    super();

    this.state = {
      sidePanelOpen:true
    }
  }


  render() {
    return (
      <div className="h-100">
        <Ol />
      </div>
    )
  }
};

const mapStoreToProps = (store) => {
  return {
    manuals: store.manuals
  }
}

export default connect(mapStoreToProps)(Fleet);
