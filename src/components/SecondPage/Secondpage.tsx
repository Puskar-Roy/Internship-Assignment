import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Component1 from "../Component1/Component1";
import Component2 from "../Component2/Component2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../interfaces/UserDetails";

const Secondpage: React.FC = () => {
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
  }, []);
  return (
    <div>
      <Stack
        alignItems="center"
        spacing={4}
        style={{
          padding: "20px 0",
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          Second Page
        </Typography>
        <Typography variant="h4">Welcome, {userDetails.name}!</Typography>
      </Stack>
      <Stack
        alignItems="center"
        spacing={4}
        style={{
          padding: "20px 0",
        }}
      >
        <Component1 />
        <Component2 />
      </Stack>
    </div>
  );
};

export default Secondpage;
