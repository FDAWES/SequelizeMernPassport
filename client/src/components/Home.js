import React from 'react';
import {Wrapper, Row, Col} from "./BootstrapGrid";

const styles = {
  header: {
    color: "green",
    borderStyle: "solid",
    borderWidth: "1px",
    textAlign: "center"
  },

  center: {
    textAlign: "center"
  }
  
}

export default ({loggedIn = false, user}) => {
  return (
    !loggedIn ? 
      <Wrapper>
        <Row>
          <Col>
            <h6 style={styles.center}><i>(Home Component)</i></h6>
            <h1 style={styles.center}>Hello World! Sign up or Login</h1>
          </Col>
        </Row>
      </Wrapper>
      :
      <Wrapper>
        <Row>
          <Col>
          <h1 style={styles.header}>You are successfully logged in {user.displayName}!</h1>
          </Col>
        </Row>
      </Wrapper>
  );
}