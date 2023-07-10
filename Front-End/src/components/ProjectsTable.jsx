import {  useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

function ProjectsTable() {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US');
      };

    let projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);

    console.log( projectWithMembers);
  return (
    <div>
      {projectWithMembers && projectWithMembers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>Project</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Urgency</TableCell>
                
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {projectWithMembers.slice(0,5).map((project, index) => (
               
                <TableRow key={index}>
                 
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{formatDate(project.startDate)}</TableCell>
                  <TableCell>{formatDate(project.endDate)}</TableCell>
                  <TableCell>{project.urgency}</TableCell>
                 
                  <TableCell>{project.status}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}

export default ProjectsTable;
