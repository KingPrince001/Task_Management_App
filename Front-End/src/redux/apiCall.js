import {loginStart,loginSuccess,loginFailure,logOut} from './userSlice';
import axios from 'axios';
import { apiDomain } from '../utils/utils';
import { toast } from 'react-toastify';


export const registerUser = async (dispatch, user) => {
    try {
      console.log(user);
      const response = await axios.post(`${apiDomain}/auth/register`, user);
      const data = response.data;
      if (data.status === 'success') {
        // alert('Account created successfully. Continue to login')
         toast.info('Account created successfully. Continue to login', {
           position: 'top-center',
         });
      }
      console.log(data);
    } catch (err) {
        // alert(err.response.data.error)
    toast.warning(err.response.data.error, {
         position: 'top-center',
       });
      console.log(err);
    }
  };
   

export const loginUser = async(dispatch,user)=>{
    // const {username} = useSelector((state) => state.user.user)
   
    console.log(user,dispatch);
dispatch(loginStart());
    try{
const {data} = await axios.post(`${apiDomain}/auth/login`,user);
dispatch(loginSuccess(data));
toast.info('Welcome back', {
position:'top-center'
})
// alert('logged in succesfully');
return true;
console.log(data);

    } catch(err) {
console.log(err)
console.log(err.response)
toast.warning(err.response.data.error, {
    position:'top-center'
})

dispatch(loginFailure());
return false;
    }

}
export const logOutuser = async(dispatch)=>{
    console.log(dispatch);
dispatch(logOut())
}