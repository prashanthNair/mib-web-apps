/* eslint-disable no-unused-vars */
/* eslint-disable no-   */
/* eslint-disable react/jsx-no-useless-fragment */
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import TransitionAlerts from "components/CustomAlert";

import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import Breadcrumbs from "components/MDBreadcrumbs";
import MDInput from "components/MDInput";
import NotificationItem from "components/MDNotifications";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
// Custom styles for DashboardNavbar
import {
  setMiniSidenav,
  setOpenConfigurator,
  setTransparentNavbar,
  useMaterialUIController,
} from "context";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// react-router components
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "redux/slices/root/rootSlice";
import {
  navbar,
  navbarContainer,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "./styles";

// Material Dashboard 2 React context

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const dispatcher = useDispatch();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const notifications =
    useSelector((state) => state.root.notification, shallowEqual) || {};
  const alerts = useSelector((state) => state.root.alerts, shallowEqual) || {};
  const isLoading = useSelector((state) => state.root.loading, shallowEqual);

  // const [hasShowNotification, setHasShowNotification] = useState(
  //   notifications.show
  // );
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that"s calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const handleCloseNotification = () => {
    const success = {
      show: false,
      status: " ",
      message: " ",
    };

    // dispatch(alert(success));
    dispatcher(notification(success));
  };
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleOpenSettings = (event) => setOpenSettings(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleSettingsClose = () => setOpenSettings(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const alertContent = (name, message) => (
    <MDTypography variant="body2" fontWeight="medium" color="white">
      {name?.toUpperCase()}
      <MDTypography
        variant="button"
        fontWeight="small"
        sx={{ marginLeft: 5 }}
        color="white"
      >
        {message}
      </MDTypography>
    </MDTypography>
  );
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );

  const renderSettingsMenu = () => (
    <Menu
      anchorEl={openSettings}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openSettings)}
      onClose={handleSettingsClose}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>settings</Icon>} title="Settings" />
      <NotificationItem
        onClick={handleLogout}
        icon={<Icon>Log out</Icon>}
        title="Log out"
      />
    </Menu>
  );
  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <MDBox pt={2} px={2}>
        {alerts && alerts.show ? (
          <TransitionAlerts
            show={alerts.show}
            message={alerts.message}
            status={alerts.status}
          />
        ) : (
          <></>
        )}
        {notifications && notifications.show ? (
          <MDSnackbar
            color={notifications.status}
            icon="check"
            title={notifications.title}
            content={notifications.message}
            open={notifications.show}
            onClose={handleCloseNotification}
            close={handleCloseNotification}
            bgWhite
          />
        ) : (
          <></>
        )}
      </MDBox>
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="account_circle-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenSettings}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {renderSettingsMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
