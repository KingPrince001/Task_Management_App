import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

const FancyTable = ({ projectByName }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
  };

  // Create an object to keep track of unique projects based on projectId
  const uniqueProjects = {};

  projectByName.forEach((project) => {
    if (!uniqueProjects[project.projectId]) {
      uniqueProjects[project.projectId] = project;
    }
  });

  const uniqueProjectsList = Object.values(uniqueProjects);

  return (
    <>
      {uniqueProjectsList.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueProjectsList.map((project) => (
              <TableRow key={project.projectId}>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{formatDate(project.startDate)}</TableCell>
                <TableCell>{formatDate(project.endDate)}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Link to={'/homePage/existingProjects'}>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No projects found</p>
      )}
    </>
  );
};

export default FancyTable;
