import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./default.scss";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";
//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery/index";
import Dashboard from "./pages/Dashboard";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      // componentwillunmount
      authListener();
    };
  }, []);

  return (
    <div className="App">
      {/* //switch will render the first route that matches */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />

        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
