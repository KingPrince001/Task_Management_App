import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const BackButton = styled(IconButton)({
  marginRight: 2,
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#3f51b5",
  width: "80vw",
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
  const [openDialog, setOpenDialog] = useState(false);
  

  const userProfile = {
    firstName: "John",
    lastName: "Chege",
    email: "johnchege@thejitu.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: "Software Developer",
    location: "Kutus Kerugoya, Kenya",
    website: "https://www.prince.com",
  };

  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  const handleEditIconClick = () => {
    setOpenDialog(true);
    setEditedProfile({ ...userProfile });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleProfileUpdate = () => {
    // Handle profile update logic here (e.g., API call)
    console.log("Updated profile:", editedProfile);
    setOpenDialog(false);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <BackButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </BackButton>
          <Typography variant="h6">User Profile</Typography>
          <IconButton color="inherit" aria-label="edit" onClick={handleEditIconClick}>
            <EditIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <ContentContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper>
              <Grid container alignItems="center" justifyContent="center" gap="30px" spacing={2}>
                <Grid item>
                  <ProfileAvatar alt="User Avatar" src={editedProfile.avatarUrl} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">{editedProfile.firstName} {editedProfile.lastName}</Typography>
                  <Typography variant="subtitle1">{editedProfile.email}</Typography>
                  <Typography variant="body1">{editedProfile.bio}</Typography>
                  <Typography variant="body2">Location: {editedProfile.location}</Typography>
                  <Typography variant="body2">Website: <a href={editedProfile.website} target="_blank" rel="noopener noreferrer">{editedProfile.website}</a></Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </ContentContainer>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={editedProfile.firstName}
            onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedProfile.lastName}
            onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bio"
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={editedProfile.location}
            onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Website"
            value={editedProfile.website}
            onChange={(e) => setEditedProfile({ ...editedProfile, website: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Profile Image URL"
            value={editedProfile.avatarUrl}
            onChange={(e) => setEditedProfile({ ...editedProfile, avatarUrl: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProfileUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Account;
