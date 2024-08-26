import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CloseState = ({ data, onDelete }) => {
  const [height, setHeight] = useState(60);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const [originalData, setOriginalData] = useState({ ...data });

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleIconClick = () => {
    setHeight(expanded ? 60 : 400);
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    if (isEditing) {
      setEditedData({ ...originalData });
    } else {
      setOriginalData({ ...editedData });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Logic to save the editedData (e.g., update it in your state or backend)
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (event) => {
    setEditedData((prevData) => ({
      ...prevData,
      gender: event.target.value,
    }));
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmed) {
      onDelete(data.id); // Assuming each data item has a unique `id`
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "0 16px",
        height: `${height}px`,
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Avatar
          alt={data.first}
          src={data.picture}
          sx={{ width: 56, height: 56 }}
        />
        {isEditing ? (
          <TextField
            name="fullName"
            value={`${editedData.first} ${editedData.last}`}
            onChange={(e) => {
              const [first, last] = e.target.value.split(" ");
              setEditedData((prevData) => ({
                ...prevData,
                first: first || "",
                last: last || "",
              }));
            }}
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography variant="h7" component="h4" sx={{ textAlign: "center" }}>
            {editedData.first} {editedData.last}
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 2,
          cursor: "pointer",
        }}
      >
        {expanded ? (
          <RemoveIcon onClick={handleIconClick} sx={{ color: "red" }} />
        ) : (
          <AddIcon onClick={handleIconClick} sx={{ color: "green" }} />
        )}
      </Box>
      {expanded && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "16px",
          }}
        >
          <Stack
            direction="row"
            spacing={12}
            sx={{
              justifyContent: "center",
              marginTop: "5px",
              marginBottom: "auto",
            }}
          >
            <Typography
              variant="h6"
              component="h4"
              sx={{ color: "#8d8d8d", "& p": { color: "black" } }}
            >
              Age
              {isEditing ? (
                <TextField
                  name="age"
                  value={editedData.age}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ width: "65px" }}
                />
              ) : (
                <p>{calculateAge(data.dob)}</p>
              )}
            </Typography>
            <Typography
              variant="h6"
              component="h4"
              sx={{ color: "#8d8d8d", "& p": { color: "black" } }}
            >
              Gender
              {isEditing ? (
                <Select
                  value={editedData.gender}
                  onChange={handleGenderChange}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 120 }}
                  renderValue={(value) => `Select: ${value}`}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Transgender">Transgender</MenuItem>
                  <MenuItem value="Rather not say">Rather not say</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              ) : (
                <p>{editedData.gender}</p>
              )}
            </Typography>
            <Typography
              variant="h6"
              component="h4"
              sx={{ color: "#8d8d8d", "& p": { color: "black" } }}
            >
              Country
              {isEditing ? (
                <TextField
                  name="country"
                  value={editedData.country}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <p>{data.country}</p>
              )}
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            component="h4"
            sx={{
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "auto",
              color: "#8d8d8d",
              "& p": { color: "black" },
            }}
          >
            Description
            {isEditing ? (
              <TextField
                name="description"
                value={editedData.description}
                onChange={handleChange}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ width: "550px" }}
              />
            ) : (
              <p>{data.description}</p>
            )}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 10,
              display: "flex",
              gap: 2,
              zIndex: 2,
            }}
          >
            {isEditing ? (
              <>
                <CancelIcon
                  onClick={handleEditClick}
                  sx={{ cursor: "pointer", color: "red" }}
                />
                <CheckCircleIcon
                  onClick={handleSaveClick}
                  sx={{ cursor: "pointer", color: "green" }}
                />
              </>
            ) : (
              <>
                <DeleteIcon
                  onClick={handleDeleteClick}
                  sx={{ cursor: "pointer", color: "red" }}
                />
                <EditIcon
                  onClick={handleEditClick}
                  sx={{ cursor: "pointer", color: "blue" }}
                />
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CloseState;
