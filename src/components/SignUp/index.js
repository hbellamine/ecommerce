import React, { Component } from "react";
import "./styles.scss";

import FormInput from "./../../components/Forms/FormInput";
import Button from "./../Forms/Button";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="signup">
        <div className="wrap">
          <h2>signup</h2>
          <form>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full Name"
              onChange={this.handleChange}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Password confirmation"
              onChange={this.handleChange}
            />

            <Button type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;
