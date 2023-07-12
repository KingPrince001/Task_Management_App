import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import {
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { getProjectWithMembers } from "../redux/apiCall";

const projectCategories = [
  { label: "Technology" },
  { label: "Marketing" },
  { label: "Sales" },
  { label: "Construction" },
  { label: "Event Management" },
  { label: "Finance" },
  { label: "Human Resources" },
  { label: "Research and Development" },
];

const urgencyOptions = [
  { label: "Low" },
  { label: "Medium" },
  { label: "High" },
];

const statusOptions = [
  { label: "Pending Start" },
  { label: "In Progress", disabled: true },
  { label: "Completed", disabled: true },
];

function ExistingProjects() {
  const dispatch = useDispatch();
  const projectWithMembers = useSelector(
    (state) => state.projectWithMembers.projectWithMembers
  );
  const user = useSelector((state) => state.user.user);
  const userList = useSelector((state) => state.userList.userList);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjectWithMembers(dispatch, user)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, user]);

  const formatData = (data) => {
    const formattedData = {};

    data.forEach((item) => {
      const projectId = item.projectId;
      const member = {
        user_id: item.user_id,
        username: item.username,
        email: item.email,
      };

      if (projectId in formattedData) {
        formattedData[projectId].members.push(member);
      } else {
        formattedData[projectId] = { project: item, members: [member] };
      }
    });

    const formattedList = Object.values(formattedData);

    return formattedList;
  };

  const [assignedMembers, setAssignedMembers] = useState([]);

  const [category, setCategory] = useState(null);
  const [urgency, setUrgency] = useState(null);
  const [status, setStatus] = useState(null);

  const handleMemberSelection = (event, selectedMembers) => {
    const validMembers = selectedMembers.filter((member) =>
      userList.some((user) => user.username === member.username)
    );
    setAssignedMembers(validMembers.map((member) => member.user_id));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
  };

  const formattedData = formatData(projectWithMembers);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState({
    projectId: "",
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    urgency: "",
    category: "",
  });

  const handleExpandMembers = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  const handleOpen = (project) => {
    const formattedStartDate = formatDate(project.startDate);
    const formattedEndDate = formatDate(project.endDate);

    setEditProject({
      projectId: project.projectId,
      projectName: project.projectName,
      description: project.description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status: project.status,
      urgency: project.urgency,
      category: project.category,
    });

    // Update form values using setValue
    setValue("projectName", project.projectName);
    setValue("description", project.description);
    setValue("startDate", formattedStartDate);
    setValue("endDate", formattedEndDate);
    setValue("status", project.status);
    setValue("urgency", project.urgency);
    setValue("category", project.category);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const isValidMembers = assignedMembers.every((memberId) =>
      userList.some((user) => user.user_id === memberId)
    );

    if (!isValidMembers) {
      toast.error("Invalid member(s) entered");
      return;
    }

    const assignedMembersArray = assignedMembers;
    setOpen(false);
  };

  const schema = yup.object().shape({
    projectName: yup.string().required("Project name is required"),
    description: yup.string().required("Description is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    urgency: yup.string().required("Urgency is required"),
    category: yup.string().required("Category is required"),
    status: yup.string().required("Status is required"),
  });

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      {isLoading ? (
        <div style={{display:'flex',height:'100vh', width:'80vw', alignItems:'center', justifyContent:'center'}} > <CircularProgress /> </div>
      
      ) : projectWithMembers && projectWithMembers.length > 0 ? (
        <Grid container spacing={3}>
          {formattedData.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {project.project.projectName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {project.project.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {formatDate(project.project.startDate)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {formatDate(project.project.endDate)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {project.project.status}
                  </Typography>
                  {expandedProjectId === project.project.projectId ? (
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        Members:
                      </Typography>
                      <ul>
                        {project.members.map((member, memberIndex) => (
                          <li key={member.user_id}>
                            <Typography variant="body2">
                              Username: {member.username}
                            </Typography>
                            <Typography variant="body2">
                              Email: {member.email}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                      <IconButton
                        onClick={() => handleExpandMembers(project.project.projectId)}
                        disabled={open}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => handleExpandMembers(project.project.projectId)}
                      >
                        See Members Assigned
                      </Button>
                      <IconButton
                        onClick={() => handleOpen(project.project)}
                        disabled={open}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" component="div" align="center">
          No projects found.
        </Typography>
      )}

      {/* Dialog / Modal for Edit Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSave)}>
            {/* Project Name */}
            <TextField
              label="Project Name"
              value={editProject.projectName}
              onChange={(e) =>
                setEditProject((prev) => ({
                  ...prev,
                  projectName: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              {...register("projectName")}
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
            />

            {/* Task */}
            <TextField
              label="Task"
              value={editProject.description}
              onChange={(e) =>
                setEditProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            {/* Start Date */}
            <TextField
              label="Start Date"
              value={editProject.startDate}
              onChange={(e) =>
                setEditProject((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            {/* End Date */}
            <TextField
              label="End Date"
              value={editProject.endDate}
              onChange={(e) =>
                setEditProject((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />

            {/* Status */}
            <Autocomplete
              value={status}
              onChange={(event, newValue) => {
                setStatus(newValue);
                setValue("status", newValue?.label);
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={statusOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  fullWidth
                  {...register("status")}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                />
              )}
            />

            {/* Urgency */}
            <Autocomplete
              value={urgency}
              onChange={(event, newValue) => {
                setUrgency(newValue);
                setValue("urgency", newValue?.label);
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={urgencyOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Urgency"
                  fullWidth
                  {...register("urgency")}
                  error={!!errors.urgency}
                  helperText={errors.urgency?.message}
                />
              )}
            />

            {/* Category */}
            <Autocomplete
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
                setValue("category", newValue?.label);
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={projectCategories}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  fullWidth
                  {...register("category")}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />

            {/* Assigned Members */}
            <Autocomplete
              multiple
              options={userList}
              getOptionLabel={(option) => option.username}
              onChange={handleMemberSelection}
              isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.username}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Assign to Members" />}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExistingProjects;
