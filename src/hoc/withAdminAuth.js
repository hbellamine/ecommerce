import {useAdminAuth} from './../customHooks'
//restrict to users who have admin rights
const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth