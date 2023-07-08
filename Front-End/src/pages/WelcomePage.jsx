import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import WelcomeContainer from '../components/WelcomeContainer';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WelcomeAnimate  from '../assets/animated_svgs/welcome-animate.svg';
import JobDone from '../assets/animated_svgs/done-animate.svg';
import TaskProgress from '../assets/animated_svgs/team-checklist-animate.svg';


const pages = [
  {
    title: 'Welcome to TaskPro',
    svg: WelcomeAnimate,
    description: '"The secret of getting ahead is getting started."',
   
  },
  {
    title: 'Job Done',
    svg: JobDone,
    description: 'Get notified when tasks are finished.',
  },
  {
    title: 'Tasks Assignment',
    svg: TaskProgress,
    description: 'Check work progress.',
  },
  
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);


  const handleNext = () => {
    if (currentPage === pages.length - 1) {
      navigate('/register');
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  

  const handleSkip = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentPage} alternativeLabel>
        {pages.map((page, index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <WelcomeContainer
        title={pages[currentPage].title}
        description={pages[currentPage].description}
        svg={pages[currentPage].svg}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSkip={handleSkip}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: -20, marginLeft: 20, marginRight:20}}>
      <Button
  variant="outlined"
  color="primary"
  onClick={handlePrevious}
  disabled={currentPage === 0}
  startIcon={<ArrowBackIcon />}
>
  Previous
</Button>

        <Box sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            // disabled={currentPage === pages.length - 1}
            endIcon={<NavigateNextIcon />}
            sx={{ marginRight: 1 }}
          >
            Next
          </Button>
          <Button variant="outlined" color="primary" onClick={handleSkip} endIcon={<SkipNextIcon />}>
            Skip
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
