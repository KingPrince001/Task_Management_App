import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SecurityIcon from "@mui/icons-material/Security";
import ShareIcon from "@mui/icons-material/Share";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HistoryIcon from "@mui/icons-material/History";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

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

const Privacy = () => {
  const policySections = [
    {
      title: "Data Collection and Usage",
      content:
        "TaskPro collects and uses personal information solely for the purpose of providing task management services. This may include names, email addresses, and user-generated content related to tasks.",
      icon: <LockIcon />,
    },
    {
      title: "Account Information",
      content:
        "Users are required to create an account to use TaskPro. We collect and store account information securely, which may include names, email addresses, and encrypted passwords.",
      icon: <AccountBoxIcon />,
    },
    {
      title: "Cookies and Similar Technologies",
      content:
        "TaskPro uses cookies and similar technologies to enhance user experience and track usage patterns on our website. Users can manage cookie preferences in their web browsers.",
      icon: <LocalAtmIcon />,
    },
    {
      title: "Third-Party Services",
      content:
        "TaskPro may use third-party services to analyze website traffic, provide customer support, and perform other tasks on our behalf. These third-party services have their own privacy policies.",
      icon: <SettingsApplicationsIcon />,
    },
    {
      title: "Data Security",
      content:
        "TaskPro employs industry-standard security measures to protect user data. However, no method of data transmission over the internet is completely secure, and we cannot guarantee absolute security of user information.",
      icon: <SecurityIcon />,
    },
    {
      title: "Data Sharing",
      content:
        "TaskPro may share user data with trusted partners or service providers to deliver certain features or services. We do not sell or rent user data to third parties for marketing purposes.",
      icon: <ShareIcon />,
    },
    {
      title: "User Rights",
      content:
        "Users have the right to access, modify, or delete their personal information stored by TaskPro. Users can also opt-out of receiving marketing communications at any time.",
      icon: <VerifiedUserIcon />,
    },
    {
      title: "Changes to this Privacy Policy",
      content:
        "TaskPro reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and users are encouraged to review the policy periodically.",
      icon: <HistoryIcon />,
    },
    {
      title: "Children's Privacy",
      content:
        "TaskPro does not knowingly collect personal information from individuals under the age of 13. If you believe that we have collected information from a child, please contact us immediately.",
      icon: <ChildFriendlyIcon />,
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions or concerns about this Privacy Policy, please contact us at privacy@taskpro.com.",
      icon: <ContactSupportIcon />,
    },
  ];

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <BackButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </BackButton>
          <Typography variant="h6">Privacy Policy</Typography>
        </Toolbar>
      </StyledAppBar>
      <ContentContainer>
        <Grid container spacing={3}>
          {policySections.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledPaper>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ marginRight: "8px" }}>{section.icon}</div>
                  <Typography variant="h5">{section.title}</Typography>
                </div>
                <Typography variant="body1">
                  {section.content.length > 200 ? `${section.content.substring(0, 200)}...` : section.content}
                </Typography>
                {section.content.length > 200 && (
                  <Typography variant="body2" color="primary">
                    <Link href="#">Read More</Link>
                  </Typography>
                )}
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </>
  );
};

export default Privacy;
