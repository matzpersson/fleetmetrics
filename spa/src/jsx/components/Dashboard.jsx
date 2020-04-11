import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Dashboard extends Component {
  render() {
    return (
      <div className="p-4 text-center">
        <FontAwesomeIcon icon={['fal','tachometer-fast']} className="mt-5 text-danger mb-3" size="4x" />
        <h1>Dashboard</h1>
        <p className="text-secondary m-5">Monitor metrics activity on your fave assets.</p>
      </div>
    );
  }
}

export default Dashboard;
