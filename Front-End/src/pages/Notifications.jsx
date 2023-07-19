import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const BackButton = styled(IconButton)({
  marginRight: 2,
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#3f51b5",
});

const ContentContainer = styled(Container)({
  marginTop: 16,
  marginBottom: 16,
});

const StyledPaper = styled(Paper)({
  padding: 16,
  textAlign: "left",
  color: "rgba(0, 0, 0, 0.87)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
});

const Notifications = () => {
  const notifications = [
    {
      type: "Reminder",
      message: "Meeting with the team at 2:00 PM",
      icon: <EventIcon />,
    },
    {
      type: "Urgent",
      message: "Task deadline approaching!",
      icon: <PriorityHighIcon />,
    },
    {
      type: "Completed",
      message: "Task 'Submit Report' marked as completed.",
      icon: <CheckCircleIcon />,
    },
    {
      type: "In Progress",
      message: "Task 'Review Presentation' is in progress.",
      icon: <AccessTimeIcon />,
    },
  ];

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <BackButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </BackButton>
          <Typography variant="h6">Notifications</Typography>
        </Toolbar>
      </StyledAppBar>
      <ContentContainer>
        <Grid container spacing={3}>
          {notifications.map((notification, index) => (
            <Grid item xs={12} key={index}>
              <StyledPaper>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ marginRight: "8px" }}>{notification.icon}</div>
                  <Typography variant="h6">{notification.type}</Typography>
                </div>
                <Typography variant="body1">{notification.message}</Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </>
  );
};

export default Notifications;
