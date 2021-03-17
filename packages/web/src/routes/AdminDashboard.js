import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Hi there!</h1>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  sid: 'dashboard'
};

Dashboard.propTypes = {};

export default Dashboard;
