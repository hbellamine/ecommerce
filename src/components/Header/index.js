import React from "react";
import {connect} from 'react-redux'
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import {auth} from './../../firebase/utils'

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span style={{cursor:"pointer"}} onClick={()=>auth.signOut()}>
                  LOGOUT
                </span>
              </li>
            </ul>
          )

          }
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

//default value for currentUser
Header.defaultProps = {
  currentUser: null,
};

const mapStateTopProps = ({user}) => ({
  currentUser: user.currentUser
})
export default connect(mapStateTopProps,null)(Header);
