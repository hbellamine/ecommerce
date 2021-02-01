export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false 
    const {userRoles} = currentUser; 

    if (userRoles.includes('admin')) return true;  // check if the user is labeled as admin
    
    return false
}