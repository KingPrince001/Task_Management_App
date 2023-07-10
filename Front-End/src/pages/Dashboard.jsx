import { useState } from 'react';
import ProjectFilters from "../components/ProjectFilters";
import ProjectsTable from "../components/ProjectsTable";
import FilterByStatus from "../components/FilterByStatus";
import FilterByUrgency from "../components/FilterByUrgency";
import FilterByCategory from "../components/FilterByCategory";
import './pages-css/dashboard.css';

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="projects-display-section">
      <ProjectFilters onChange={handleFilterChange} />
      {activeFilter === 'category' && <FilterByCategory />}
      {activeFilter === 'urgency' && <FilterByUrgency />}
      {activeFilter === 'status' && <FilterByStatus />}
      {activeFilter === null && <ProjectsTable />}
    </div>
  );
}

export default Dashboard;
