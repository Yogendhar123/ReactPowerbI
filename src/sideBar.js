import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Button, Drawer } from "@mui/material";

// hooks
import useResponsive from "./hooks/useResponsive";
import unileverlog from "./images/unileverlog.png";
import Scrollbar from "./components/scrollbar";

import * as config from "./Configlatest";
import {
  TableServiceClient,
  TableClient,
  AzureSASCredential,
  odata,
} from "@azure/data-tables";
import { useState } from "react";
import React from "react";
import { Menu, MenuList, ListItemIcon, ListItemText } from "@mui/material";
import reporyLogo from "./images/reportLogo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import CircularProgress from "@mui/material/CircularProgress";
// ----------------------------------------------------------------------

const NAV_WIDTH = 70;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const [showReport, setShowReport] = useState(false);
  const [selectproduct, setSelectproduct] = useState("");
  const [getreport, setgetreport] = useState();
  const [use, Setuse] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = React.useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorproductEl, setAnchorproductEl] = useState(null);
  const [anchorpqrEl, setAnchorpqrEl] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [beauty, setbeauty] = useState();
  const [userSpecificReport, setUserSpecificReport] = useState();
  const [tabledata, settabledata] = useState();

  const isDesktop = useResponsive("up", "lg");
  const [selectedWorkspaceID, setSelectedWorkspaceID] = useState(null);
  const [modalIsOpenloder, setIsOpenloader] = React.useState(false);
  const [uniqueReport, setuniqueReport] = useState([]);
  const [updateReport, setupdateReport] = useState([]);

  function openModalloader() {
    setIsOpenloader(true);
  }
  function closeModalloader() {
    setIsOpenloader(false);
  }

  const handleWorkspaceClick = (workspaceID) => {
    setSelectedWorkspaceID(workspaceID);
  };

  const filteredPartitionKeys = use.filter(
    (option) => option.WorkspaceID === selectedWorkspaceID
  );

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const logo = (
    <Box
      component="img"
      src={unileverlog}
      alt="total"
      loading="lazy"
      style={{
        marginLeft: 0,
        marginTop: 5,
        width: 40,
        height: 40,
        borderRadius: 400 / 2,
      }}
    />
  );
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReport1Click = (e, option) => {
    settabledata(option);
    window.location.reload(false);
    if (localStorage.getItem("selectedReportName")) {
      localStorage.removeItem("selectedReportName");
      localStorage.setItem("selectedReportName", JSON.stringify(option));
    } else {
      localStorage.setItem("selectedReportName", JSON.stringify(option));
    }
    setShowWelcome(true);
    handleMenuClose();
  };

  const handleClick = (event) => {
    // event.preventDefault();
    setAnchorEl(event.currentTarget);
    // getreportbyId();
    // window.location.reload(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorproductEl(null);
    setAnchorpqrEl(null);
  };

  const welcomehandleClick = (event) => {
    let keysToRemove = ["selectedReportName", "ReportID", "ReportName"];
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    window.location.reload(false);
  };

  const view = async () => {
    const endpoint = "https://bnlwestgunileverbd00015.table.core.windows.net";
    const saas =
      "?sv=2022-11-02&ss=t&srt=sco&sp=rwlacu&se=2024-12-30T18:54:07Z&st=2023-10-25T10:54:07Z&spr=https&sig=dhSMg7EaDvxf178HLi3GKUIQHuJuNEGX2qRNDPcaXIY%3D";
    const tableService = new TableServiceClient(
      endpoint,
      new AzureSASCredential(saas)
    );

    const tableClient = new TableClient(
      endpoint,
      "ConfigPowerBIEmbedded",
      new AzureSASCredential(saas)
    );
    const columnNames = [
      "PartitionKey",
      "RowKey",
      "WorkspaceID",
      "ReportID",
      "ReportName",
      "WorkspaceName",
    ]; // Replace with the actual column names you want to retrieve
    const iterator = tableClient.listEntities({
      select: columnNames, // Specify the columns you want to retrieve
    });
    const allEntities = [];
    for await (const entity of iterator) {
      allEntities.push(entity);
    }
    // console.log("All entities in the table:");
    for (const entity of allEntities) {
      // console.log(entity);
    }
    Setuse(allEntities);
    setbeauty(allEntities);
  };
  // console.log(use);

  useEffect(() => {
    view();
  }, []);
 useEffect(() => {
    // view();
    getreportbyId();
  }, [use]);
  const unique = use.filter((obj, index) => {
    return index === use.findIndex((o) => obj.WorkspaceID === o.WorkspaceID);
  });
  // const [sessionReport, setSessionReport] = useState([]);
  
  const uniqueid = uniqueReport.filter((obj, index) => {
    return (
      index === uniqueReport.findIndex((o) => obj.WorkspaceID === o.WorkspaceID)
    );
  });

 const getreportbyId = () => {
    console.log(unique);
    unique.map((workspace_id) =>
      fetch(
        config.powerBiApiUrl +
          "v1.0/myorg/groups/" +
          workspace_id?.WorkspaceID +
          "/reports",
        {
          headers: {
            Authorization:
              "Bearer " + sessionStorage.getItem("AzureAccessToken"),
          },
          method: "GET",
        }
      )
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (body) {
              // Successful response
              if (response.ok) {
                // console.log("body", body?.value);
                // console.log("use",use)
                // let obj3 = [];
                use.map(function (a) {
                  // console.log(a.id)
                  let matched = body?.value.filter((b) => a.ReportID === b.id);
                  if (matched.length) {
                    if (
                      !updateReport.some((item) => item.ReportID === a.ReportID)
                    ) {
                      updateReport.push({
                        ReportID: a.ReportID,
                        ReportName: a.ReportName,
                        WorkspaceID: a.WorkspaceID,
                        WorkspaceName: a.WorkspaceName,
                        etag: a.etag,
                        partitionKey: a.partitionKey,
                        rowKey: a.rowKey,
                        timestamp: a.timestamp,
                      });
                    }
                  }
                });
                // console.log(obj3);
                // setuniqueReport((prev) => [...prev, ...obj3]);
                setuniqueReport(updateReport);
              }

            });
          }
        })
        .catch(function (error) {
          console.error("Failure in making API call." + error);
        })
    );
  };
  const toggleReport = () => {
    setShowReport(true);
    view();
  };
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "flex", justifyContent: "center" }}>
        <Button onClick={(event) => welcomehandleClick(event)} sx={{ mt: 0 }}>
          {logo}
        </Button>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderRadius: "15px",
          marginTop: "20px",
          backgroundColor: "whitesmoke",
          boxShadow:
            "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
          border: "1px solid #eaecf0",
          color: "#667085",
          // padding: "4px 4px !important"
        }}
      >
        <Button onClick={(event) => handleClick(event)}>
          {" "}
          <img
            src={reporyLogo}
            alt="Rpt"
            style={{ width: 40, height: 30, borderRadius: 200 / 2 }}
          />{" "}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ fontSize: "0.8rem" }}
        >
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {" "}
            {uniqueid.map((option) => (
              <TreeItem
                nodeId={option?.WorkspaceName}
                label={option?.WorkspaceName}
                key={option}
                value={option}
              >
                {uniqueReport
                  ?.filter(
                    (partitionOption) =>
                      partitionOption.WorkspaceName === option.WorkspaceName
                  )
                  .map((filteredOption) => (
                    <TreeItem
                      nodeId={filteredOption.partitionKey}
                      label={filteredOption.partitionKey}
                      key={filteredOption.partitionKey}
                      value={filteredOption.partitionKey}
                      onClick={(e) => handleReport1Click(e, filteredOption)}
                    />
                  ))}
              </TreeItem>
            ))}
          </TreeView>
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "#f5f5f5",
              // borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
