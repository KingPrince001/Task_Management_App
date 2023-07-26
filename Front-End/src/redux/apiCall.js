import {loginStart,loginSuccess,loginFailure,logOut} from './userSlice';
import { userListStart, userListSuccess, userListFailure } from './userListSlice';
import { projectStart, projectSuccess, projectFailure } from './projectSlice';
import { assignMembersStart, assignMembersSuccess, assignMembersFailure } from './assignMembersSlice';
import { projectWithMembersStart, projectWithMembersSuccess, projectWithMembersFailure } from './projectWithMembersSlice';
import { statusStart, statusSuccess, statusFailure } from './filterByStatusSlice';
import { urgencyStart, urgencySuccess, urgencyFailure } from './filterByUrgencySlice';
import { categoryStart, categorySuccess, categoryFailure } from './filterByCategorySlice';
import { updateProjectStart, updateProjectSuccess, updateProjectFailure } from './updateProjectSlice';
import { projectByNameStart, projectByNameSuccess, projectByNameFailure } from './projectByNameSlice';
import {deleteProjectStart, deleteProjectSuccess, deleteProjectFailure} from "./deleteProjectSlice";
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


// assign members to project
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




//get project plus members assigned
export const getProjectWithMembers = async (dispatch) => {
  dispatch(projectWithMembersStart());

  try {
    const {data} = await axios.get(`${apiDomain}/getProjectWithMembers`);
    console.log(data);
    dispatch(projectWithMembersSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(projectWithMembersFailure());
  }
}

// update project
export const updateProject = async (projectId, updatedProjectData, dispatch) => {
  try {
    // Start the project update request
    dispatch(updateProjectStart());

    // Perform database update operation for the project
    const response = await axios.put(`${apiDomain}/updateProjectWithMembers/${projectId}`, updatedProjectData);
    const updatedProject = response.data;
    console.log(`response api:`, updatedProject);

    // Project update successful
    dispatch(updateProjectSuccess(updatedProject));
    console.log(`updated project:`, updatedProject);

    // Return the updated project data
    return updatedProject;
  } catch (error) {
    // Handle error
    dispatch(updateProjectFailure());
    console.log(error);
    throw error;
  }
};

//delete project
export const deleteProject = async (dispatch, projectId) => {
  dispatch(deleteProjectStart());

  try {
    const {data} = await axios.delete(`${apiDomain}/deleteProject/${projectId}`);
   

    dispatch(deleteProjectSuccess());
  } catch (error) {
    console.log(error)
    dispatch(deleteProjectFailure());
  }
}

//filter by projects name
export const filterProjectsByName = async (dispatch, user, projectName) => {
  dispatch(projectByNameStart());

  try {
    const {data} = await axios.get(`${apiDomain}/getProjectByName/${projectName}`,{
      headers: {"authorization" : `${user.token}`}
    });
    console.log(`token: ${user.token}`)
    console.log(data);
    dispatch(projectByNameSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(projectByNameFailure());
  }
}


//filter projects by status
export const filterProjectsByStatus = async (dispatch, user, status) => {
  dispatch(statusStart());

  try {
    const {data} = await axios.get(`${apiDomain}/filterByStatus/${status}`,{
      headers: {"authorization" : `${user.token}`}
    });
    console.log(`token: ${user.token}`)
    console.log(data);
    dispatch(statusSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(statusFailure());
  }
}


//filter projects by urgency
export const filterProjectsByUrgency = async (dispatch, user, urgency) => {
  dispatch(urgencyStart());

  try {
    const {data} = await axios.get(`${apiDomain}/filterByUrgency/${urgency}`,{
      headers: {"authorization" : `${user.token}`}
    });
    console.log(`token: ${user.token}`)
    console.log(data);
    dispatch(urgencySuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(urgencyFailure());
  }
}


//filter projects by category
export const filterProjectsByCategory = async (dispatch, user, category) => {
  dispatch(categoryStart());

  try {
    const {data} = await axios.get(`${apiDomain}/filterByCategory/${category}`,{
      headers: {"authorization" : `${user.token}`}
    });
    console.log(`token: ${user.token}`)
    console.log(data);
    dispatch(categorySuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(categoryFailure());
  }
}