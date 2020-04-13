import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Statistics extends Component {
  render() {
    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','chart-line']} className="mt-5 text-danger mb-3" size="4x" />
        <h1>Statistics</h1>
        <p className="text-secondary m-5">Server Message Activity.</p>
      </div>
    );
  }
}

export default Statistics;
