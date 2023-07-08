import {loginStart,loginSuccess,loginFailure,logOut} from './userSlice';
import { userListStart, userListSuccess, userListFailure } from './userListSlice';
import { projectStart, projectSuccess, projectFailure } from './projectSlice';
import { assignMembersStart, assignMembersSuccess, assignMembersFailure } from './assignMembersSlice';
import axios from 'axios';
import { apiDomain } from '../utils/utils';
import { toast } from 'react-toastify';


//register a user
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
  
  
//login user
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

//logout user
export const logOutuser = async(dispatch)=>{
    console.log(dispatch);
dispatch(logOut())
}


//get all users
export const getAllUsers = async (dispatch, user) => {
  dispatch(userListStart());
  console.log(`${apiDomain}/users`)
  try {
    const {data} = await axios.get(`${apiDomain}/users`,{
      headers: {"authorization" : `${user.token}`}
    });
    console.log(`token: ${user.token}`)
    console.log(data);
    dispatch(userListSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(userListFailure());
  }
}

//create project

export const createProject = async (projectData, user, dispatch) => {
  try {
    // Start the project request
    dispatch(projectStart());

    // Perform database insert operation for the project
    const response = await axios.post(`${apiDomain}/createProject`, projectData);
    const project = response.data;
console.log(`response api: ${response.data}`);
    // Project creation successful
    dispatch(projectSuccess(project));
    console.log(`project api : ${project}`);
    // Return the inserted project data
    return project;
  } catch (error) {
    // Handle error
    dispatch(projectFailure());
    console.log(error);
    throw error;
  }
};


//assign members to project
export const assignMembersToProject = async (projectId, assignedMembersArray, user, dispatch) => {
  try {
    // Start the assigned members request
    dispatch(assignMembersStart());

    const memberData = {
      projectId: projectId,
      userIds: assignedMembersArray, // Pass the array of assigned member IDs directly
    };
console.log(memberData);
    // Perform database insert operation for all members
    const response = await axios.post(`${apiDomain}/assignMembersToProject`, memberData);
    const assignedMembers = response.data;
    console.log(`response members: ${response.data}`);
    

    // Assigned members assignment successful
    dispatch(assignMembersSuccess());

    
  } catch (error) {
    // Handle error
    console.log(error);
    dispatch(assignMembersFailure());
    throw error;
  }
};


