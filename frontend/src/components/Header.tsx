// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black',
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'center',
});

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">
          Event Management App
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
