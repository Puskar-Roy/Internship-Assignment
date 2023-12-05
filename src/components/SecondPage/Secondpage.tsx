import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../interfaces/UserDetails";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    const parsedUserDetails = userDetailsString
      ? JSON.parse(userDetailsString)
      : {};

    setUserDetails(parsedUserDetails);

    if (
      !parsedUserDetails.name ||
      !parsedUserDetails.phone ||
      !parsedUserDetails.email
    ) {
      alert("Please enter your details before accessing this page.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4">Second Page</Typography>
      <Typography>
        Welcome, {userDetails.name}! Phone: {userDetails.phone}, Email:
        {userDetails.email}
      </Typography>
    </Container>
  );
};

export default SecondPage;
