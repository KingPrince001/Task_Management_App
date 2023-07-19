import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const EditProjectDialogFormFields = ({
  editProjectData,
  errors,
  setValue,
  assignedMembersData,
  categoryData,
  urgencyData,
  statusData,
  userList,
  handleMemberSelection,
}) => {
  // Options for status field
  const statusOptions = [
    { label: "Pending" },
    { label: "In Progress" },
    { label: "Completed" },
  ];

  // Options for urgency field
  const urgencyOptions = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];

  // Options for category field
  const categoryOptions = [
    { label: "Category 1" },
    { label: "Category 2" },
    { label: "Category 3" },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
  };

  return (
    <>
      {/* Project Name */}
      <TextField
        label="Project Name"
        value={editProjectData.projectName}
        onChange={(e) =>
          setValue("projectName", e.target.value)
        }
        fullWidth
        margin="normal"
        defaultValue={editProjectData.projectName}
        error={!!errors.projectName}
        helperText={errors.projectName?.message}
      />

      {/* Description */}
      <TextField
        label="Description"
        value={editProjectData.description}
        onChange={(e) =>
          setValue("description", e.target.value)
        }
        fullWidth
        margin="normal"
        defaultValue={editProjectData.description}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      {/* Start Date */}
      <TextField
        label="Start Date"
        value={formatDate(editProjectData.startDate)}
        onChange={(e) =>
          setValue("startDate", e.target.value)
        }
        fullWidth
        margin="normal"
        defaultValue={editProjectData.startDate}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
      />

      {/* End Date */}
      <TextField
        label="End Date"
        value={formatDate(editProjectData.endDate)}
        onChange={(e) =>
          setValue("endDate", e.target.value)
        }
        fullWidth
        margin="normal"
        defaultValue={editProjectData.endDate}
        error={!!errors.endDate}
        helperText={errors.endDate?.message}
      />

      {/* Status */}
      <Autocomplete
        value={statusData}
        onChange={(event, newValue) => {
          statusData(newValue);
          setValue("status", newValue?.label);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        options={statusOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Status"
            fullWidth
            error={!!errors.status}
            helperText={errors.status?.message}
          />
        )}
      />

      {/* Urgency */}
      <Autocomplete
        value={urgencyData}
        onChange={(event, newValue) => {
          urgencyData(newValue);
          setValue("urgency", newValue?.label);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        options={urgencyOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Urgency"
            fullWidth
            error={!!errors.urgency}
            helperText={errors.urgency?.message}
          />
        )}
      />

      {/* Category */}
      <Autocomplete
        value={categoryData}
        onChange={(event, newValue) => {
          categoryData(newValue);
          setValue("category", newValue?.label);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        options={categoryOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            fullWidth
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        )}
      />

      {/* Assigned Members */}
      <Autocomplete
        multiple
        options={userList}
        getOptionLabel={(option) => option.username}
        onChange={handleMemberSelection}
        isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.username} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => <TextField {...params} label="Assign to Members" />}
      />
    </>
  );
};

export default EditProjectDialogFormFields;