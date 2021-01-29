import { useAuth } from "./../customHooks";
import { withRouter } from "react-router-dom";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);

//To make sure that if the user is not logged in, he can't access to certain pages. 
