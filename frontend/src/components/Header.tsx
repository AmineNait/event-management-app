import React from "react";
import { Typography } from "@mui/material";
import { StyledAppBar, StyledToolbar } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">Kumojin Test App</Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
