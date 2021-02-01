import { useAuth } from "./../customHooks";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;

//To make sure that if the user is not logged in, he can't access to certain pages. 
