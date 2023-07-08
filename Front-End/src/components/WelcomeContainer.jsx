import React from 'react';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const StyledWelcomeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  marginBottom: theme.spacing(1),

  '& .title': {
    marginBottom: theme.spacing(1),
  },

 
  '& .svg': {
height:'60vh',
marginTop:'-200px',
  },
}));

const WelcomeContainer = ({ title, description, svg, onNext, onPrevious, onSkip }) => {
  return (
    <StyledWelcomeContainer>
         <img src={svg} alt="Welcome Image" className='svg' />
      <Typography variant="h4" className="title">
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    
    </StyledWelcomeContainer>
  );
};

export default WelcomeContainer;
