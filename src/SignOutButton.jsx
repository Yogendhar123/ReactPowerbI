import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

// import { FaUserCircle, FaUser } from "react-icons/fa"
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Logout, SupervisedUserCircle } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#2397D4",
    },
    children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
  };
}

// import "./SignButton.css";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance, accounts } = useMsal();

  const [status, setstatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // console.log(accounts)

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
    setstatus(true);
    sessionStorage.clear();
    let keysToRemoveSignOut = ["selectedReportName", "ReportID" , "ReportName","succefullyUpdated"];
    keysToRemoveSignOut.forEach(k =>
      localStorage.removeItem(k))
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const username = accounts[0]?.name;
  // console.log(accounts, username);

  useEffect(() => {
    sessionStorage.setItem("username", username);
  }, [username]);

  return (
    <>
      {!status ? (
        <Stack direction="row" spacing={2}>
          <Avatar
            onClick={handleClick}
            {...stringAvatar(username)}
            style={{ fontSize: "0.9rem" }}
            variant="circular"
          />
          {/* {console.log(username)} */}
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ fontSize: "0.8rem" }}
          >
            {/* <MenuList> */}
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ "& .MuiTypography-root": { fontSize: "0.8rem" } }}
                onClick={() => handleLogout()}
              >
                Logout
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ "& .MuiTypography-root": { fontSize: "0.8rem" } }}
              >
                {username}
              </ListItemText>
            </MenuItem>
            {/* </MenuList> */}
          </Menu>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
