import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Workload = () => {
  const projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [statusCounts, setStatusCounts] = useState({
    'Pending Start': 0,
    'In Progress': 0,
    'Completed': 0,
  });
  const [assignedPersonCounts, setAssignedPersonCounts] = useState({});

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Count the number of projects for each status
    const newStatusCounts = { ...statusCounts };
    projectWithMembers.forEach((project) => {
      const status = project.status;
      if (status === 'Pending Start') {
        newStatusCounts['Pending Start']++;
      } else if (status === 'In Progress') {
        newStatusCounts['In Progress']++;
      } else if (status === 'Completed') {
        newStatusCounts['Completed']++;
      }
    });

    setStatusCounts(newStatusCounts);

    // Count the number of projects assigned to each person
    const newAssignedPersonCounts = {};
    projectWithMembers.forEach((project) => {
      const assignedPersonName = project.username;
      if (assignedPersonName) {
        if (newAssignedPersonCounts[assignedPersonName]) {
          newAssignedPersonCounts[assignedPersonName]++;
        } else {
          newAssignedPersonCounts[assignedPersonName] = 1;
        }
      }
    });

    setAssignedPersonCounts(newAssignedPersonCounts);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(newAssignedPersonCounts),
        datasets: [
          {
            label: 'Number of Projects Assigned',
            data: Object.values(newAssignedPersonCounts),
            backgroundColor: '#58508d',
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Assigned Person',
              font: {
                weight: '800',
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Projects',
              font: {
                weight: '800',
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [projectWithMembers]);

  return (
    <>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{marginTop:'50px', fontSize:'16px'}}>Workload</h2>
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

export default Workload;
