import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="animated fadeIn" />;
  }
}

Dashboard.defaultProps = {
  sid: 'Dashboard',
  permissions: {}
};

export default Dashboard;
