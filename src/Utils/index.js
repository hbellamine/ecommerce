import axios from "axios";

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;

  if (userRoles.includes("admin")) return true; // check if the user is labeled as admin

  return false;
};

export const apiInstance = axios.create({
  baseUrl: 'http://localhost:5001/ecommerce-7a260/us-central1/api'
});
