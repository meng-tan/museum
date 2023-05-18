import { useState, forwardRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MuseumIcon from "@mui/icons-material/Museum";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import UserService from "@service/UserService";

const AuthButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return UserService.getInstance().isLoggedIn() ? (
    <>
      <IconButton
        aria-controls="menu-appbar"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate("/orders")}>My Orders</MenuItem>
        <MenuItem onClick={() => UserService.getInstance().logout()}>
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton component={Link} to="/auth" color="inherit">
      <AccountCircle />
    </IconButton>
  );
};

const Header = forwardRef((props, ref) => {
  return (
    <AppBar {...props} ref={ref}>
      <Toolbar>
        <IconButton component={Link} to="/" color="inherit">
          <MuseumIcon />
        </IconButton>

        {/* todo: could change into a drawer on small screen */}
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            columnGap: {
              xs: 1,
              sm: 2
            },
            textTransform: "uppercase"
          }}
        >
          <Typography variant="subtitle2" component={Link} to="/exhibitions">
            Exhibition
          </Typography>

          <Typography variant="subtitle2" component={Link} to="/visit">
            Visit
          </Typography>
        </Container>

        <AuthButton />
      </Toolbar>
    </AppBar>
  );
});
Header.displayName = "Header";
export default Header;
