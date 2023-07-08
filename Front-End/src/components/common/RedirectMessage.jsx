import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const RedirectMessage = ({message, destination, link}) => {
  return (
    <Typography variant="body1" align="center">
      {message}{' '}
      <Link to={link} style={{ textDecoration: 'none' }}>
        <span
          style={{
            textDecoration: 'underline',
            display: 'inline-block',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1976d2';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'inherit';
          }}
        >
         {destination}
        </span>
      </Link>
    </Typography>
  );
};

export default RedirectMessage;
