import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MuseumIcon from "@mui/icons-material/Museum";
import {
  Typography,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Container,
  AppBar,
  Avatar
} from "@mui/material";

import { selectUser, thunkedLogout } from "@features/userSlice";

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return user.isLoggedIn ? (
    <>
      <IconButton
        aria-controls="menu-appbar"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar variant="rounded" sx={{ width: 24, height: 24 }}>
          {user.username?.charAt(0)?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            handleClose();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/orders");
            handleClose();
          }}
        >
          My Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(thunkedLogout());
            navigate("/");
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton component={Link} to="/login" color="inherit">
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
            Exhibitions
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
