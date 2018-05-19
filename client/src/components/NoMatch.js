import React from "react";
import lostDog from "./images/lostDog.jpg"
const styles = {
  center: {
    textAlign: "center"
  }
};

const NoMatch = () => (
  <div style={styles.center}>
    <h1>Looks like your lost buddy...</h1>
    <img alt="Lost Dog" src={lostDog} />
    <h6><i>(The above image is credited to <a href="https://www.missinganimalresponse.com/lost-dog-behavior/">https://www.missinganimalresponse.com/lost-dog-behavior/)</a></i></h6>
  </div>
);

export default NoMatch;