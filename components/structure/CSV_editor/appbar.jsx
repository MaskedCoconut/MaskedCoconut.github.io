import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../../context/CSV_editor/AppDataContext";

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
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PFM csv editor
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
              <Tab label="Upload" {...a11yProps(0)} />
              <Tab label="Edit" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
