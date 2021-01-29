import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";

import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { auth } from "./../../firebase/utils";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const reset = () => {
    setEmail("");
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        //page where to send the user when he reset the email
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          //history is available because we imported withRouter
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please Try Again."];
          setErrors(err);
        });
    } catch (err) {
      //console.log(err)
    }
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
