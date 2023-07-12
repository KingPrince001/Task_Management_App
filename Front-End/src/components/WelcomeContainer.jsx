import React from 'react';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';



const StyledWelcomeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '90vh',
  gap:'100px',
  marginTop:'10px',

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
      <div>
      <img src={svg} alt="Welcome Animation" className='svg' />
      </div>
         <div style={{marginTop:'-230px'}}>
         <Typography variant="h2" className="title" style={{fontSize:'40px'}}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
         </div>
      
    
    </StyledWelcomeContainer>
  );
};

export default WelcomeContainer;
