import Applatest from "../Applatest";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { SignOutButton } from "../SignOutButton";
import { useState } from "react";
import { Button } from "@mui/material";
function View() {
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => {
    setShowEdit(true);
  };
  const toggleView = () => {
    setShowEdit(false);
  };
  return (
    <div className="">
      <Applatest />
    </div>
  );
}

export default View;
