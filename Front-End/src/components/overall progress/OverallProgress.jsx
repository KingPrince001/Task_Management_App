


import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const OverallProgress = () => {
  const projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [statusCounts, setStatusCounts] = useState({
    'Pending Start': 0,
    'In Progress': 0,
    'Completed': 0,
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const updateChartData = () => {
      // Count the number of projects for each status
      const newStatusCounts = {
        'Pending Start': 0,
        'In Progress': 0,
        'Completed': 0,
      };
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

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Pending Start', 'In Progress', 'Completed'],
          datasets: [
            {
              label: 'Number of Projects',
              data: [newStatusCounts['Pending Start'], newStatusCounts['In Progress'], newStatusCounts['Completed']],
              backgroundColor: ['#58508d', '#bc5090', '#003f5c'],
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Status',
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
    };

    updateChartData(); // Initial chart rendering

    const delay = 5000; // Delay time in milliseconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      // Update chart data after the specified delay
      updateChartData();
    }, delay);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      clearTimeout(timeoutId); // Clean up the timeout on component unmount
    };
  }, [projectWithMembers]);

  return (
    <>
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <h2 style={{marginTop:'50px', fontSize:'16px'}}>Overall Progress</h2>
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

export default OverallProgress;
