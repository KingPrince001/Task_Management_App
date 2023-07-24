
// import { useSelector } from "react-redux";
// import { Pie } from 'react-chartjs-2';
// import { CircularProgress } from '@mui/material';

// const InProgress = () => {
//     const projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);

//   if (projectWithMembers.length === 0) {
//     // Display the circular progress loader while data is being fetched or when there are no projects
//     return <CircularProgress />;
//   }
//   let cnt = 0
//   // Count the number of projects in each status category
//   const statusCounts = projectWithMembers.reduce((counts, project) => {
//     const status = project.status;
//     project.status? cnt + 1 : cnt
//     counts[status] = (counts[status] || 0) + 1;
//     return counts;
//   }, {});
//   console.log(projectWithMembers)
// console.log(cnt)
//   // Extract labels and data for the pie chart
//   const labels = Object.keys(statusCounts);
//   const data = Object.values(statusCounts);

//   // Define colors for each status category
//   const statusColors = {
//     'In Progress': 'rgba(75, 192, 192, 0.6)',
//     'Completed': 'rgba(54, 162, 235, 0.6)',
//     'Pending Start': 'rgba(255, 206, 86, 0.6)',
//     // Add more colors for other status categories
//   };

//   // Create the dataset for the pie chart
//   const dataset = {
//     data,
//     backgroundColor: labels.map((status) => statusColors[status]),
//     hoverBackgroundColor: labels.map((status) => statusColors[status]),
//   };

//   const chartData = {
//     labels,
//     datasets: [dataset],
//   };

//   return (
//     <div>
//       <h2>Projects In Progress</h2>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// export default InProgress;


