import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

function FilterByCategory() {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category?.category);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US');
  };

  return (
    <div>
      {categoryData ? (
        categoryData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Category</TableCell>
                 
                  <TableCell>Due Date</TableCell>
                  <TableCell>Urgency</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryData.slice(0, 5).map((project, index) => (
                  <TableRow key={index}>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    
                    <TableCell>{formatDate(project.endDate)}</TableCell>
                    <TableCell>{project.urgency}</TableCell>
                    <TableCell>{project.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No Projects</div>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default FilterByCategory;
