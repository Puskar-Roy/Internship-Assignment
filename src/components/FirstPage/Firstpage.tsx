import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import UserDetails from "../../interfaces/UserDetails";

const FirstPage: React.FC = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange =
    (field: keyof UserDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserDetails((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const createTextField = (
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <TextField
      label={label}
      color="secondary"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
    />
  );

  const saveAndRedirect = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.email) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/user");
  };

  return (
    <Container>
      <Stack
        spacing={4}
        alignItems="center"
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "150px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "8px",
          padding: "56px",
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          First Page
        </Typography>
        {createTextField("Name", userDetails.name, handleInputChange("name"))}
        {createTextField(
          "Phone",
          userDetails.phone,
          handleInputChange("phone")
        )}
        {createTextField(
          "Email",
          userDetails.email,
          handleInputChange("email")
        )}
        <Button variant="contained" color="secondary" onClick={saveAndRedirect}>
          Continue
        </Button>
      </Stack>
    </Container>
  );
};

export default FirstPage;
