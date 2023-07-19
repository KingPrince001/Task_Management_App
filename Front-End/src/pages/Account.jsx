import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: "0 auto 16px",
});

const Account = () => {
  const userProfile = {
    firstName: "John",
    lastName: "Chege",
    email: "johnchege@thejitu.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum justo in tristique ultrices.",
    location: "Kutus Kerugoya, Kenya",
    website: "https://www.prince.com",
  };

  return (
    <>
      <StyledAppBar position="static" >
        <Toolbar>
          <BackButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </BackButton>
          <Typography variant="h6">User Profile</Typography>
        </Toolbar>
      </StyledAppBar>
      <ContentContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper>
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                  <ProfileAvatar alt="User Avatar" src={userProfile.avatarUrl} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">{userProfile.firstName} {userProfile.lastName}</Typography>
                  <Typography variant="subtitle1">{userProfile.email}</Typography>
                  <Typography variant="body1">{userProfile.bio}</Typography>
                  <Typography variant="body2">Location: {userProfile.location}</Typography>
                  <Typography variant="body2">Website: <a href={userProfile.website} target="_blank" rel="noopener noreferrer">{userProfile.website}</a></Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
};

export default Account;
