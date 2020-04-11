import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Assets extends Component {
  render() {
    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','box']} className="mt-5 text-danger mb-3" size="4x" />
        <h1>Assets</h1>
        <p className="text-secondary m-5">Your field assets like sensors, vessels, vehicles.</p>
      </div>
    );
  }
}

export default Assets;
