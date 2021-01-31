import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser,resetAllAuthForms } from "./../../redux/User/user.actions";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../../components/Forms/FormInput";
import Button from "./../Forms/Button";

// Mapping the variables we need to use from Redux
const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});
const Signup = (props) => {
  // destructuring what we need to use from mapstate using useSelector hooks
  const { signUpSuccess, signUpError } = useSelector(mapState);

  //useDispatch allows to dispatch the function we want from the redux store without need of using mapStateToDispatch and without Connect
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors("");
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent reloading the page
    dispatch(
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };
  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  const configAuthWrapper = {
    headline: "Registration",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Password confirmation"
            handleChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};
export default withRouter(Signup);
