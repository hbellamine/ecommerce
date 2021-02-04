import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../redux/User/user.actions";

import { Link } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import {selectCartItemsCount} from './../../redux/Cart/cart.selectors'
import "./styles.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems : selectCartItemsCount(state)
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser,cartData,totalNumCartItems } = useSelector(mapState);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">Your Cart ({totalNumCartItems})</Link>
            </li>
            {currentUser && [
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li>
                <span style={{ cursor: "pointer" }} onClick={() => signOut()}>
                  LOGOUT
                </span>
              </li>,
            ]}

            {!currentUser && [
              <li>
                <Link to="/registration">Register</Link>
              </li>,
              <li>
                <Link to="/login">Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

//default value for currentUser
Header.defaultProps = {
  currentUser: null,
};

export default Header;
