import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import Link from "next/link";
import { appTitle } from "../settings";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useContext } from "react";

const settings = ["Placeholder", "Placeholder"];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ResponsiveAppBar() {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const tabNumber = data.currenttab;

  const handleTabChange = (event, newTab) => {
    dispatch({ type: "setCurrenttab", newtab: newTab });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalAirportIcon href="/" sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: { xs: 0.25, lg: 2 },
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex" },
              maxWidth: { xs: 300, md: 500, lg: 800, xl: 1000 },
              margin: "auto",
            }}
          >
            <Tabs
              value={tabNumber}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label="Schedule" {...a11yProps(0)} />
              <Tab label="Show-up" {...a11yProps(1)} />
              <Tab label="Terminal" {...a11yProps(2)} />
              <Tab label="Terminal2" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
