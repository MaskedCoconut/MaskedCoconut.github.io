import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { appTitle } from "../settings";
import { exportData, importData } from "../utils";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ResponsiveAppBar() {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const tabNumber = data.currenttab;

  const handleTabChange = (event, newTab) => {
    dispatch({ type: "setCurrenttab", newtab: newTab });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // shorthand

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
              <MenuItem>
                <Button
                  onClick={() => {
                    exportData(data);
                    handleCloseUserMenu();
                  }}
                  size="medium"
                  variant="contained"
                  component="label"
                >
                  Save
                </Button>
              </MenuItem>
              <MenuItem>
                <Button size="medium" variant="contained" component="label">
                  Load
                  <input
                    onChange={(e) => {
                      importData(e, data, dispatch);
                      handleCloseUserMenu();
                    }}
                    id="csvInput"
                    hidden
                    type="File"
                  />
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
