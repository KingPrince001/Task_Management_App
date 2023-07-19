import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom"; // Assuming you have React Router for navigation

const BackButton = styled(IconButton)({
  marginRight: 2,
});

const SearchContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 5,
});

const SearchInput = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
});

const userProfile = {
  firstName: "John",
  lastName: "Chege",
  email: "johnchege@thejitu.com",
  avatarUrl: "https://i.pravatar.cc/150?img=3",
  bio: "Software Developer",
  location: "Kutus Kerugoya, Kenya",
  website: "https://www.prince.com",
};

const TopBar = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <AppBar position="static" style={{ flexGrow: "1", width: "100%" }}>
      <Toolbar
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="Search Project by name" />
        </SearchContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={
              <div style={{ padding: "8px" }}>
                <Typography>{userProfile.firstName} {userProfile.lastName}</Typography>
                <Typography variant="body2" style={{ fontSize: "14px" }}>
                  {userProfile.bio}
                </Typography>
                <Typography variant="body2" style={{ fontSize: "14px" }}>
                  {userProfile.location}
                </Typography>
                <Typography variant="body2" style={{ fontSize: "14px" }}>
                  {userProfile.email}
                </Typography>
              </div>
            }
            placement="bottom"
            arrow
            open={showDetails}
          >
            <Link to="/homePage/account" style={{ textDecoration: "none", color: "inherit" }}>
              <Avatar
                alt="User Avatar"
                src={userProfile.avatarUrl}
                style={{ marginLeft: 10 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          </Tooltip>
          <div>
            <Typography variant="h6" style={{ marginLeft: 10 }}>
              {userProfile.firstName} {userProfile.lastName}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "14px",  marginLeft: '10px', marginTop: "-5px" }}>
              {userProfile.bio}
            </Typography>
          </div>
          <IconButton color="inherit" aria-label="expand more">
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
