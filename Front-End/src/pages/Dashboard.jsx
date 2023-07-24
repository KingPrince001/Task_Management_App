import { useState } from 'react';
import ProjectFilters from "../components/ProjectFilters";
import ProjectsTable from "../components/ProjectsTable";
import FilterByStatus from "../components/FilterByStatus";
import FilterByUrgency from "../components/FilterByUrgency";
import FilterByCategory from "../components/FilterByCategory";
import CircularProgress from '@mui/material/CircularProgress';
import TopBar from '../components/TopBar';
import Overview from '../components/overview/Overview';
import OverallProgress from '../components/overall progress/OverallProgress';
import Chat from '../components/chat/Chat';
import Workload from '../components/workload/Workload';
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
  <div className="overview">
    <Overview />
  </div>
  <div className="master-container">
   
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
    <div className="chat">
    <Chat />
    </div>
    </div>
    <div className="footer">
<div className="overall-progress">
<OverallProgress />
</div>
<div className="workload">
<Workload />
</div>
    </div>
    </div>
  );
}

export default Dashboard;
