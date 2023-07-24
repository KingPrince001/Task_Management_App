import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear"; // Import the clear icon
import { Link } from "react-router-dom";
import { filterProjectsByName } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import FancyTable from "./FancyTable";

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

const ClearButton = styled(IconButton)({
  padding: 6,
  marginLeft: 8,
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const projectByName = useSelector((state) => state.projectByName.projectByName);

  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showTable, setShowTable] = useState(false); // State to hide/show the table

  const handleSearch = () => {
    setLoading(true);
    filterProjectsByName(dispatch, user, projectName);
    setShowTable(true); // Show the table when a search is initiated
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setProjectName("");
    setNoResults(false);
    setLoading(false);
    dispatch({ type: "PROJECT_BY_NAME_SUCCESS", payload: [] });
    setShowTable(false); // Hide the table when the search is cleared
  };

  useEffect(() => {
    setLoading(false);
    setNoResults(projectByName.length === 0);
  }, [projectByName]);

  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <>
      <AppBar position="static" style={{ flexGrow: "1", width: "100%" }}>
        <Toolbar
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <SearchContainer>
            <SearchIcon onClick={handleSearch} />
            <SearchInput
              placeholder="Search Project by name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </SearchContainer>
          {projectName && (
            <ClearButton onClick={handleClearSearch} style={{marginLeft:'-530px', color:'white'}}>
              <ClearIcon />
            </ClearButton>
          )}
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
              <Typography variant="body2" style={{ fontSize: "14px", marginLeft: '10px', marginTop: "-5px" }}>
                {userProfile.bio}
              </Typography>
            </div>
            <IconButton color="inherit" aria-label="expand more">
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {loading ? (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      ) : (
        <>
          {showTable ? (
            <>
              {noResults ? (
                <Typography variant="h2" style={{ textAlign: "center", fontSize:'22px', margin:'15px 0 ' }}>
                  No projects found
                </Typography>
              ) : (
                <FancyTable projectByName={projectByName} />
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default TopBar;
