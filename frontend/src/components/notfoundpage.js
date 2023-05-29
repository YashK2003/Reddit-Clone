import React from 'react';
import { withRouter } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (<div style={{ marginTop: 150 }}>
        <b>
          <center>
            <h1>404 Not found</h1>
          </center>
        </b>{" "}
      </div>);
  }
}

export default withRouter(NotFound);