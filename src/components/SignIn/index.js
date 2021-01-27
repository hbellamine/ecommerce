import React,{Component} from "react";
import Button from "./../Forms/Button";
import "./styles.scss";
import { signInWithGoogle } from "./../../firebase/utils";

class SignIn extends Component {
    handleSubmit = async e => {
        //to prevent the reloading of the page when the form is submitted
        e.preventDefault();
    }
    render(){
        return (
            <div className="signin">
              <div className="wrap">
                <h2>Login</h2>
                <div className="formWrap">
                  <form onSubmit={this.handleSubmit}>
                    <div className="socialSignin">
                      <div className="row">
                        <Button onClick={signInWithGoogle}>Sign in with google</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
    }
  
};
export default SignIn;
