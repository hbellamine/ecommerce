import React, { useState } from "react";
import Button from "./../Forms/Button";
import "./styles.scss";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import FormInput from "./../Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";
import { Link,withRouter } from "react-router-dom";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resetForm = () => {
    setEmail("");
    setPassword("");
    props.history.push("/")
  };
  const handleSubmit = async (e) => {
    //to prevent the reloading of the page when the form is submitted
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      //console.log(err)
    }
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">LogIn</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
