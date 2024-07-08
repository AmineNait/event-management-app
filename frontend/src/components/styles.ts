import { Box, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
}));

export const CalendarContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  marginTop: theme.spacing(4),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2, 4, 3),
}));

export const StyledAppBar = styled(AppBar)({
  backgroundColor: "black",
});

export const StyledToolbar = styled(Toolbar)({
  justifyContent: "center",
});

export const ColorBox = styled(Box)({
  width: 24,
  height: 24,
  marginRight: 8,
  borderRadius: "50%",
});

export const calendarStyles = {
  height: "500px",
};

export const colorBoxStyles = (backgroundColor: string) => ({
  backgroundColor,
  padding: "0 10px",
  borderRadius: "5px",
  color: "white",
});

export const formControlStyles = {
  textAlign: "left",
};

export const eventStyleGetter = (event: any) => {
  const backgroundColor = event.resource.color || "#00ff00";
  const style = {
    backgroundColor,
    borderRadius: "5px",
    opacity: 0.8,
    color: "white",
    border: "0px",
    display: "block",
  };
  return {
    style,
  };
};
