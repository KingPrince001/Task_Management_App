import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'; // Add Chip import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pages-css/newproject.css';

const schema = yup.object().shape({
  projectName: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  urgency: yup.string().required('Urgency is required'),
  category: yup.string().required('Category is required'),
});

const projectCategories = [
  { label: 'Category 1' },
  { label: 'Category 2' },
  { label: 'Category 3' },
];

const urgencyOptions = [
  { label: 'Low' },
  { label: 'Medium' },
  { label: 'High' },
];

function NewProject() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [assignedMembers, setAssignedMembers] = useState([]);

  const onSubmit = (data) => {
    // Project creation API call
    // Include the assigned members data along with other form data
    const projectData = {
      ...data,
      assignedMembers: assignedMembers.map((member) => member.label),
    };
    console.log('Project Data:', projectData);
  };

  const resetForm = () => {
    // Reset the form
    const form = document.getElementById('newProjectForm');
    form.reset();
  };

  const handleMemberSelection = (event, selectedMembers) => {
    setAssignedMembers(selectedMembers);
  };

  return (
    <>
      <div className="container">
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
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <br />
          <TextField
  style={{ margin: '10px 0' }}
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
  style={{ margin: '10px 10px 10px 20px' }}
  label="End Date"
  type="date"
  InputLabelProps={{
    shrink: true,
  }}
  {...register('endDate')}
  error={!!errors.endDate}
  helperText={errors.endDate?.message}
/>

          <br />
          <Autocomplete
            options={urgencyOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Urgency"
              />
            )}
            {...register('urgency')}
            error={!!errors.urgency}
            helperText={errors.urgency?.message}
          />
          <br />
          <Autocomplete
            options={projectCategories}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
              />
            )}
            {...register('category')}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <br />
          <Autocomplete
            multiple
            options={[]}
            getOptionLabel={(option) => option.label}
            onChange={handleMemberSelection}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign to Members"
              />
            )}
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
  );
}

export default NewProject;
