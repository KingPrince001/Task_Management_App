import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import FilterSelect from './FilterSelect';
import { filterProjectsByStatus } from '../redux/apiCall';
import { filterProjectsByUrgency } from '../redux/apiCall';
import { filterProjectsByCategory } from '../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';


const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ProjectFilters = ({onChange}) => {
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  let statusData = useSelector((state) => state.status.status);
  const urgencyData = useSelector((state) =>state.urgency.urgency);
  const categoryData = useSelector((state) => state.category.category)
  const user = useSelector((state)=> state.user.user);

  const handleCategoryFilter = (value) => {
    setCategory(value);
    onChange('category');
    // Perform filtering based on category
    filterProjectsByCategory(dispatch, user, value)
    console.log('Selected Category:', value);
  };
  useEffect(()=>{
    console.log(categoryData)
  }, [categoryData]);

  const handleUrgencyFilter = (value) => {
    setUrgency(value);
      onChange('urgency');
    // Perform filtering based on urgency
    filterProjectsByUrgency(dispatch, user, value);
    console.log('Selected Urgency:', value);
  };
useEffect(()=>{
  console.log(urgencyData);
}, [urgencyData])
  const handleStatusFilter = (value) => {
    setStatus(value);
    onChange('status');
    filterProjectsByStatus(dispatch, user, value)
    console.log('Selected Status:', value);
  
  };
  useEffect(() => {
    console.log(statusData);
  }, [statusData]);

  return (
    <Container>
      <Typography variant="h2" style={{ fontSize: '20px', margin:'10px' }}>
        Project Summary
      </Typography>

      <FilterSelect
        label="Category"
        value={category}
        options={[
          { label: 'Category', value: '',  disabled: true },
          { label: 'Technology', value: 'technology' },
          { label: 'Finance', value: 'finance' },
          { label: 'Sales', value: 'sales' },
          { label: 'construction', value: 'construction' },
          { label: 'marketing', value: 'marketing' },
          { label: 'Event Management', value: 'Event Management' },
          { label: 'Human Resources', value: 'Human Resources' },
          { label: 'Research and Development', value: 'Research and Development' },
        
        ]}
        
        onChange={handleCategoryFilter}
      />

      <FilterSelect
        label="Urgency"
        value={urgency}
        options={[
          { label: 'Urgency', value: '' , disabled: true },
          { label: 'High', value: 'high' },
          { label: 'Medium', value: 'medium' },
          { label: 'Low', value: 'low' },
        ]}
        onChange={handleUrgencyFilter}
      />

      <FilterSelect
        label="Status"
        value={status}
        options={[
          { label: 'Status', value: '',  disabled: true},
          { label: 'Pending Start', value: 'pending start' },
          { label: 'In Progress', value: 'in progress' },
          { label: 'Completed', value: 'completed' },
        ]}
        onChange={handleStatusFilter}
      />
    </Container>
  );
};

export default ProjectFilters;
