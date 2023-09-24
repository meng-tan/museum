import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MuseumIcon from "@mui/icons-material/Museum";
import {
  Typography,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Container,
  AppBar,
  Avatar,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material";

import { selectUser, thunkedLogout } from "@features/userSlice";
import { APP } from "@tools/constant";

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

const drawerWidth = 240;

const pages = [
  { title: "Exhibitions", link: "/exhibitions" },
  { title: "Visit", link: "/visit" },
  { title: "About", link: "/about" },
  { title: "Collection", link: "/collection" }
];

const Header = forwardRef((props, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List disablePadding>
        <ListItem component={Link} to={"/"}>
          <ListItemButton>
            <ListItemIcon>
              <MuseumIcon />
            </ListItemIcon>
            <ListItemText
              primary={APP.NAME}
              primaryTypographyProps={{
                variant: "button"
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />

        {pages.map((page) => (
          <ListItem key={page.title} component={Link} to={page.link}>
            <ListItemButton>
              <ListItemText
                primary={page.title}
                inset
                primaryTypographyProps={{
                  variant: "button"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar {...props} ref={ref}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: {
              md: "none"
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="/"
          color="inherit"
          sx={{
            display: {
              xs: "none",
              md: "inline-flex"
            }
          }}
        >
          <MuseumIcon />
        </IconButton>
        <Typography
          variant="button"
          component={Link}
          to="/"
          sx={{
            display: {
              xs: "none",
              md: "inline-flex"
            },
            "&:hover": {
              textDecoration: "none"
            }
          }}
        >
          {APP.NAME}
        </Typography>

        <Container>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex"
              },
              columnGap: 2,
              justifyContent: "end"
            }}
          >
            {pages.map((page) => (
              <Typography
                variant="button"
                component={Link}
                to={page.link}
                key={page.title}
              >
                {page.title}
              </Typography>
            ))}
          </Box>
        </Container>
        <AuthButton />
      </Toolbar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
});
Header.displayName = "Header";

export default Header;
