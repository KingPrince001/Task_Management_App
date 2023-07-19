import { useState } from 'react';
import ProjectFilters from "../components/ProjectFilters";
import ProjectsTable from "../components/ProjectsTable";
import FilterByStatus from "../components/FilterByStatus";
import FilterByUrgency from "../components/FilterByUrgency";
import FilterByCategory from "../components/FilterByCategory";
import CircularProgress from '@mui/material/CircularProgress';
import TopBar from '../components/TopBar';
import './pages-css/dashboard.css';

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const handleFilterChange = (filter) => {
    setIsFilterLoading(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 1000); // Simulating a loading delay of 1 second
  };

  return (<div>
  <div className="app-bar">
    <TopBar />
  </div>
    <div className="projects-display-section">
      
      <ProjectFilters onChange={handleFilterChange} />
      {activeFilter === 'category' && (
        <>
          {isFilterLoading ? (
            <CircularProgress />
          ) : (
            <FilterByCategory />
          )}
        </>
      )}
      {activeFilter === 'urgency' && (
        <>
          {isFilterLoading ? (
            <CircularProgress />
          ) : (
            <FilterByUrgency />
          )}
        </>
      )}
      {activeFilter === 'status' && (
        <>
          {isFilterLoading ? (
            <CircularProgress />
          ) : (
            <FilterByStatus />
          )}
        </>
      )}
      {activeFilter === null && <ProjectsTable />}
    </div>
    </div>
  );
}

export default Dashboard;
