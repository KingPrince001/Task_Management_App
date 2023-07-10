import { useEffect } from "react";
import { getProjectWithMembers } from "../redux/apiCall";
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

function ExistingProjects() {
  const dispatch = useDispatch();
  let projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);
 
  const user = useSelector((state)=> state.user.user);

  useEffect(() => {
    getProjectWithMembers(dispatch, user);
  }, []);

  console.log(projectWithMembers);

  return (
    <div>
      {projectWithMembers && projectWithMembers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Urgency</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {projectWithMembers.map((project, index) => (
               
                <TableRow key={index}>
                  <TableCell>{project.projectId}</TableCell>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.urgency}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.user_id}</TableCell>
                  <TableCell>{project.username}</TableCell>
                  <TableCell>{project.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default ExistingProjects;
