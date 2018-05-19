import React, {Component} from "react"
import { Redirect, Link } from "react-router-dom"
import { Wrapper, Row, Col } from "./BootstrapGrid";
import API from "../utils/API";
import googleImage from "./googleButtons/btn_google_signin_dark_normal_web.png";

const styles = {
  header: {
    color: "purple",
    borderStyle: "solid",
    borderWidth: "1px",
    textAlign: "center"
  },
  center: {
    textAlign: "center"
  }
}

class Login extends Component{ 
  state = {
    email: "",
    password: "",
    redirectTo: ""
  }

  textInput = React.createRef();

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  };

  handleLogin = event => {
    event.preventDefault();
    API.login({ email: this.state.email, password: this.state.password})
    .then((res) => {
        this.props.setUser(res.data.user)
        this.setState({
          redirectTo: "/"
        });
    })
    .catch(err => console.log("Error executing handleLogin: ", err));
    ;
  }

  googleSignUp = event => {
    event.preventDefault();
    API.googleSignup()
    .then(res => {
      console.log("Google got this yo!");
    })
    .catch(err => console.log("Error executing googleSignup: ", err));
  }

  componentDidMount(){
    this.textInput.current.focus();
  }

  render(){
    if(this.state.redirectTo){
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <Wrapper>
        <Row>
          <Col>
            <h6 style={styles.center}><i>(Login Component)</i></h6>
            <h1 style={styles.header}>Login</h1>
          </Col>
        </Row>
        <form>
          <Row>
            <Col span={2} offset={3}>
              <label>Email: </label>
            </Col>
            <Col span={3}>
              <input ref={this.textInput} name="email" type="text" value={this.state.email} required onChange={this.handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={3}>
              <label>Password: </label>
            </Col>
            <Col span={4}>
              <input name="password" type="password" value={this.state.password} required onChange={this.handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={3}>
              <button onClick={this.handleLogin}>Submit</button>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
              <h3 style={styles.header}>
                Sign In With Google: 
                <Link to="/auth/google" target="_self"><img src={googleImage} alt="Sign in with Google" /></Link>
                <a href="/auth/google"> </a>
              </h3>
            </Col>
          </Row>
        </form>
      </Wrapper>
    );
  }
}

export default Login;