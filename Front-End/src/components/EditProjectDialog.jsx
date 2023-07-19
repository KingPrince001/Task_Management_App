import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import EditProjectDialogFormFields from "./EditProjectDialogFormFields";

const schema = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  urgency: yup.string().required("Urgency is required"),
  category: yup.string().required("Category is required"),
});

const EditProjectDialog = ({
  open,
  handleClose,
  handleSave,
  editProjectData,
  assignedMembersData,
  categoryData,
  urgencyData,
  statusData,
  userList,
}) => {
  const { handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleSave(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EditProjectDialogFormFields
            editProjectData={editProjectData}
            errors={errors}
            setValue={setValue}
            assignedMembersData={assignedMembersData}
            categoryData={categoryData}
            urgencyData={urgencyData}
            statusData={statusData}
            userList={userList}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
