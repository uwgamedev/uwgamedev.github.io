import React from 'react';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    render() {
      return (
        <div>
          <p>Reminder that this is inside layout!</p>
          {this.props.children}

        </div>
      )
    }
  }
}

export default Layout;
