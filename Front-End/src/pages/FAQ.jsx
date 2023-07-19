import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQContainer = styled('div')(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  paddingTop: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  '&:before': {
    display: 'none',
  },
}));

const Summary = styled(AccordionSummary)(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-content': {
    marginLeft: 0,
  },
  '& .MuiAccordionSummary-expandIcon': {
    marginRight: -theme.spacing(1),
  },
}));

const SummaryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const Details = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const faqData = [
    {
      question: 'How do I create a new task?',
      answer:
        'To create a new task, navigate to the task management page and click on the "Add Task" button. Fill in the required details such as task name, description, due date, etc., and click "Save" to create the task.',
    },
    {
      question: 'How can I assign a task to a team member?',
      answer:
        'When creating or editing a task, you can select a team member from the "Assignee" dropdown list. Choose the desired team member who should be responsible for the task.',
    },
    {
      question: 'Can I set a priority for tasks?',
      answer:
        'Yes, you can set a priority for tasks. When creating or editing a task, you can choose the priority level such as high, medium, or low. This helps in organizing and prioritizing tasks effectively.',
    },
    {
      question: 'How do I mark a task as complete?',
      answer:
        'To mark a task as complete, go to the task details page and click on the "Mark as Complete" button. This will update the task status and indicate that it has been finished.',
    },
    {
      question: 'Can I add attachments to tasks?',
      answer:
        'Yes, you can add attachments to tasks. When creating or editing a task, you can upload and attach relevant files or documents to provide additional information or context.',
    },
    {
      question: 'Is it possible to set reminders for tasks?',
      answer:
        'Yes, you can set reminders for tasks. When creating or editing a task, you can specify a reminder date and time. You will receive a notification or reminder at the specified date and time to help you stay on track.',
    },
    {
      question: 'How do I view tasks assigned to me?',
      answer:
        'To view tasks assigned to you, go to the "My Tasks" section or filter tasks by your name. This will display a list of tasks that are assigned specifically to you.',
    },
    {
      question: 'Can I organize tasks into categories or projects?',
      answer:
        'Yes, you can organize tasks into categories or projects. You can create different projects or categories and assign tasks to them. This helps in structuring and categorizing tasks based on different criteria.',
    },
    {
      question: 'How can I search for specific tasks?',
      answer:
        'To search for specific tasks, you can use the search functionality available on the task management page. Enter relevant keywords or task details in the search bar, and the system will display matching tasks.',
    },
    {
      question: 'Is there a way to track task progress?',
      answer:
        'Yes, you can track task progress. The task management app provides features like task status updates, progress indicators, and completion tracking. These features allow you to monitor and track the progress of tasks over time.',
    },
  ];
  

function FAQ() {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <FAQContainer>
      <Title variant="h4" component="h1">
        Frequently Asked Questions
      </Title>
      {faqData.map((faq, index) => (
        <StyledAccordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <Summary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <SummaryTitle variant="subtitle1" component="h3">
              {faq.question}
            </SummaryTitle>
          </Summary>
          <Details>
            <Typography variant="body1" component="p">
              {faq.answer}
            </Typography>
          </Details>
        </StyledAccordion>
      ))}
    </FAQContainer>
  );
}

export default FAQ;
