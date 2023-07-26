
import { useSelector } from "react-redux";
import { getProjectWithMembers } from "../redux/apiCall";
import ExistingProjects from "../pages/ExistingProjects";
import CircularProgress from "@mui/material/CircularProgress";

function Test() {
 
  const projectWithMembers = useSelector((state) => state.projectWithMembers?.projectWithMembers);
  const isLoading = useSelector((state) => state.projectWithMembers.isLoading);


  if (isLoading) {
    return <CircularProgress />;
  }

  return <ExistingProjects projectWithMembers={projectWithMembers} />;
}

export default Test;