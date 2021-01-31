import userTypes from "./user.types";
import { auth, handleUserProfile } from "./../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (err) {
    //console.log(err)
  }
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  //  check if password matches

  if (password !== confirmPassword) {
    const err = ["Password Don't match"];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err,
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await handleUserProfile(user, { displayName });

    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });

    // resetForm();
    // props.history.push("/");
  } catch (err) {
    //console.log(err);
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    //page where to send the user when he reset the email
    url: "http://localhost:3000/login",
  };
  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
        //props.history.push("/login");
      })
      .catch(() => {
        const err = ["Email not found. Please Try Again."];

        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    //console.log(err)
  }
};
