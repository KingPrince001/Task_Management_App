import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectWithMembers } from "../redux/apiCall";
import ExistingProjects from "../pages/ExistingProjects";
import CircularProgress from "@mui/material/CircularProgress";

function Test() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const projectWithMembers = useSelector((state) => state.projectWithMembers.projectWithMembers);
  const isLoading = useSelector((state) => state.projectWithMembers.isLoading);

  useEffect(() => {
    getProjectWithMembers(dispatch, user);
  }, [dispatch, user]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <ExistingProjects projectWithMembers={projectWithMembers} />;
}

export default Test;
