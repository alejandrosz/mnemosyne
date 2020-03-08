// auth/Signup.js
import React, { Component } from "react";
import AuthService from "./AuthService";
import "./Signup.scss";

//signup y login son iguales a excepción de el html renderizado y el endpoint de nuestra API rest a la que llamamos
//uno llama a /signup y el otro a /login usando nuestro AuthService
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getUser(response.user);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signup-form">
        <p>{this.state.error ? "error " : ""}</p>
        <form className="signupForm" onSubmit={this.handleFormSubmit}>
          {/* <label>name</label> */}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            placeholder="name:"
          />

          {/* <label>pass</label> */}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            placeholder="| password:"
          />

          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}

export default Signup;
