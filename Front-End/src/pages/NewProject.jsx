import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pages-css/newproject.css';
import { getAllUsers, createProject, assignMembersToProject } from '../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';


const schema = yup.object().shape({
  projectName: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup
    .date()
    .min(new Date(), 'Start date must be equal to or greater than the current date', { excludeUndefined: true, exclusive: false })
    .required('Start date is required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be greater than the start date')
    .required('End date is required'),
  urgency: yup.string().required('Urgency is required'),
  category: yup.string().required('Category is required'),
  status: yup.string().required('Status is required'),
});



const projectCategories = [
  { label: 'Technology' },
  { label: 'Marketing' },
  { label: 'Sales' },
  { label: 'Construction' },
  { label: 'Event Management' },
  { label: 'Finance' },
  { label: 'Human Resources' },
  { label: 'Research and Development' },
];

const urgencyOptions = [
  { label: 'Low' },
  { label: 'Medium' },
  { label: 'High' },
];

const statusOptions = [
  { label: 'Pending Start' },
  { label: 'In Progress', disabled: true },
  { label: 'Completed', disabled: true },
];
// Filter out disabled options
const filteredStatusOptions = statusOptions.filter(option => !option.disabled);

function NewProject() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.userList);
  const user = useSelector((state) => state.user.user);
  const project = useSelector((state) => state.project.project)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(dispatch, user)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [assignedMembers, setAssignedMembers] = useState([]);

  // Use useState to create and update the category variable
  const [category, setCategory] = useState(null);

  // Use useState to create and update the urgency variable
  const [urgency, setUrgency] = useState(null);

  // Use useState to create and update the status variable
  const [status, setStatus] = useState(null);

  const handleMemberSelection = (event, selectedMembers) => {
    const validMembers = selectedMembers.filter((member) =>
      userList.some((user) => user.username === member.username)
    );
    setAssignedMembers(validMembers.map((member) => member.user_id));
  };

  const onSubmit = async (data) => {
    console.log(data);
    const isValidMembers = assignedMembers.every((memberId) =>
      userList.some((user) => user.user_id === memberId)
    );

    if (!isValidMembers) {
      toast.error('Invalid member(s) entered');
      return;
    }
    const assignedMembersArray = assignedMembers;
    try {
      const startDate = new Date(data.startDate).toISOString();
      const endDate = new Date(data.endDate).toISOString();

      const projectData = {
        projectName: data.projectName,
        description: data.description,
        startDate: startDate,
        endDate: endDate,
        urgency: data.urgency,
        category: data.category,
        status: data.status,
      };
      console.log(`assignedmembersarray newproject: ${assignedMembersArray}`)
      const createdProject = await createProject(projectData, user, dispatch);
      const projectId = createdProject.projectId;
      await assignMembersToProject(projectId, assignedMembersArray, user, dispatch);
     

      toast.success('Project created successfully');
    } catch (error) {
      toast.error('Failed to create project');
      console.log(error);
    }
  };

  

  return (
    <div className="container">
      
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
        
      ) : (
        <>
          <div className="container" >
            <h1>Create New Project</h1>
            <form id="newProjectForm" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Project Name"
                fullWidth
                {...register('projectName')}
                error={!!errors.projectName}
                helperText={errors.projectName?.message}
              />
              <br />
              <TextField
                style={{ margin: '10px 0' }}
                label="Task"
                fullWidth
                multiline
                rows={4}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <br />
              <div className="date-inputs">
                <TextField
                 fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('startDate')}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
                <TextField
                 fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('endDate')}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              </div>
              <br />
              <div className="input-container">
                <Autocomplete
                  value={urgency}
                  onChange={(event, newValue) => {
                    setUrgency(newValue);
                  }}
                  style={{width:'100%'}}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  options={urgencyOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Urgency"
                      fullWidth
                      
                      {...register('urgency')}
                      error={!!errors.urgency}
                      helperText={errors.urgency?.message}
                    />
                  )}
                />
                <br />
                <Autocomplete
  value={status}
  onChange={(event, newValue) => {
    setStatus(newValue);
  }}
  style={{width:'100%'}}
  isOptionEqualToValue={(option, value) => option.label === value.label}
  options={filteredStatusOptions}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Status"
      fullWidth
      {...register('status')}
      error={!!errors.status}
      helperText={errors.status?.message}
    />
  )}
/>

              </div>
              <br />
              <Autocomplete
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                options={projectCategories}
                getOptionLabel={(option) => option.label}
               renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  fullWidth
                  {...register('category')}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
            <br />
            <Autocomplete
              multiple
              options={userList}
              getOptionLabel={(option) => option.username}
              onChange={handleMemberSelection}
              isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.username} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Assign to Members" />}
            />
            <br />
            <div className="button-container">
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                Create Project
              </Button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </>
      )}
    </div>
  );
}

export default NewProject;
