import {auth} from './../../firebase/utils'

export const handleResetPasswordAPI = (email) => {
    const config = {
        //page where to send the user when he reset the email
        url: "http://localhost:3000/login",
      };
    return new Promise((resolve,reject)=>{
     auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
         resolve()
        })
        .catch(() => {
          const err = ["Email not found. Please Try Again."];
            reject(err)
         
        });
    })
}