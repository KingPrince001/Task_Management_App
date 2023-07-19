import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectWithMembers } from "../redux/apiCall";
import { CircularProgress, Card, CardContent, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProjectDialog from "../components/EditProjectDialog";

function ExistingProjects() {
  const dispatch = useDispatch();
  const projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);
  const user = useSelector((state) => state.user.user);
  const userList = useSelector((state) => state.userList.userList);

  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjectsWithMembers();
  }, []);

  const getProjectsWithMembers = async () => {
    try {
      setIsLoading(true);
      await dispatch(getProjectWithMembers(user));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching project data:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
  };

  const groupedProjects = projectWithMembers.reduce((result, project) => {
    const existingProject = result.find((p) => p.projectId === project.projectId);
    if (existingProject) {
      existingProject.members.push({
        username: project.username,
        email: project.email
      });
    } else {
      result.push({
        projectId: project.projectId,
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        urgency: project.urgency,
        category: project.category,
        status: project.status,
        members: [
          {
            username: project.username,
            email: project.email
          }
        ]
      });
    }
    return result;
  }, []);

  const handleViewMembers = (projectId) => {
    const selectedProject = groupedProjects.find((project) => project.projectId === projectId);
    setSelectedProject(selectedProject);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
    setOpenDialog(false);
  };
  const handleCloseDialog2 = () => {
    setSelectedProject(null);
    setOpenDialog2(false);
  };

const handleSave = () => {

}
 
  const handleEditProject = (projectId) => {
    const selectedProject = groupedProjects.find((project) => project.projectId === projectId);
    setSelectedProject(selectedProject);
    setOpenDialog2(true);
  };

  const handleDeleteProject = (projectId) => {
    // Implement the logic to handle deleting a project
    console.log("Delete project with ID:", projectId);
  };

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <Grid item xs={12} align="center">
          <CircularProgress />
        </Grid>
      ) : (
        groupedProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.projectId}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {project.projectName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  {project.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Start Date: {formatDate(project.startDate)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  End Date: {formatDate(project.endDate)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Urgency: {project.urgency}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Category: {project.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Status: {project.status}
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewMembers(project.projectId)}
                    style={{ marginTop: "10px" }}
                    disableElevation // Disable button elevation to prevent focus outline
                  >
                    View Members
                  </Button>
                  <IconButton
                    style={{ padding: "2px" }}
                    color="primary"
                    onClick={() => handleEditProject(project.projectId)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{ padding: "2px" }}
                    color="secondary"
                    onClick={() => handleDeleteProject(project.projectId)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
      {selectedProject && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle style={{ marginTop: "-10px" }}>{selectedProject.projectName}</DialogTitle>
          <DialogTitle style={{ marginTop: "-35px", fontSize: "15px" }}>Assigned Members</DialogTitle>
          <hr style={{ width: "90%", marginTop: "-13px", marginBottom: "-16px" }} />
          <DialogContent>
            <DialogContentText>
              {selectedProject.members.map((member) => (
                <Typography key={member.email}>
                  Username: {member.username}
                  <br />
                  Email: {member.email}
                  <hr />
                </Typography>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      )}
      {selectedProject && (
        <EditProjectDialog
          open={openDialog2}
          handleClose={handleCloseDialog2}
          handleSave={handleSave} // Implement the handleSave function
          editProjectData={selectedProject}
          assignedMembersData={selectedProject.members}
          categoryData={selectedProject.category}
          urgencyData={selectedProject.urgency}
          statusData={selectedProject.status}
          userList={userList} // Provide the necessary userList data
        />
      )}
    </Grid>
  );
}

export default ExistingProjects;
