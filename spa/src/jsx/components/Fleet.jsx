import React from 'react';
import { connect } from "react-redux";
import Ol from "./Ol";

class Fleet extends React.Component {
  render() {
    return (
      <Ol />
    )
  }
};

const mapStoreToProps = (store) => {
  return {
    manuals: store.manuals
  }
}

export default connect(mapStoreToProps)(Fleet);
