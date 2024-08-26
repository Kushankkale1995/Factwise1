import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseState from "./CloseState";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import celebrities from "./celebrities.json"; // Import the JSON file

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  borderRadius: "10px",
  width: "100%",
  border: "2px solid #ccc",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TopCenterBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trim().toLowerCase()); // Trim and lowercase the query
  };

  // Filter celebrities based on the search query
  const filteredCelebrities = celebrities.filter(
    (item) =>
      item.first.toLowerCase().includes(searchQuery) ||
      item.last.toLowerCase().includes(searchQuery) || // Search by last name too
      `${item.first} ${item.last}`.toLowerCase().includes(searchQuery) // Search by full name
  );

  return (
    <Box
      sx={{
        width: "680px",
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          List View
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Search>
      </Box>

      {filteredCelebrities.length > 0 ? (
        filteredCelebrities.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "26px",
              height: "auto",
            }}
          >
            <CloseState data={item} />
          </Box>
        ))
      ) : (
        <Typography variant="h6" component="p" sx={{ textAlign: "center" }}>
          No results found
        </Typography>
      )}
    </Box>
  );
};

export default TopCenterBox;
