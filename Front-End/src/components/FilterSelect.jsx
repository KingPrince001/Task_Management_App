import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)`
  width: 100px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const FilterSelect = ({ label, value='', options, onChange }) => {
  return (
    <StyledFormControl variant="standard">
      <InputLabel >{label}</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label={label} >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default FilterSelect;
