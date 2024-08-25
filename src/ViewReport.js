import * as React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import Applatest from "./Applatest";
import Applatestedit from "./Applatestedit";
import { SignOutButton } from "./SignOutButton";
import DashboardLogo from "./images/dashboardLogo.svg";
import background from "../src/images/background_img.jpg";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadIcon from "@mui/icons-material/Download";
import Modal from "react-modal";
import CircularProgress from "@mui/material/CircularProgress";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.25)",
  },
};
export default function ViewReport() {
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowview] = useState(false);
  const [button1Visible, setButton1Visible] = useState(true);
  const [button2Visible, setButton2Visible] = useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenloder, setIsOpenloader] = React.useState(false);

  function openModalloader() {
    setIsOpenloader(true);
  }
  function closeModalloader() {
    setIsOpenloader(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleButton1Click = () => {
    setButton1Visible(false);
    setButton2Visible(true);
  };

  const handleButton2Click = () => {
    setButton1Visible(true);
    setButton2Visible(false);
  };

  const toggleEdit = () => {
    setShowEdit(true);
    // window.location.reload(false);
  };
  const toggleView = () => {
    setShowview(true);
    setShowEdit(false);
    window.location.reload(false);
  };
  console.log(isDownloading);
  const handleDownloadReport = () => {
    const groupId = sessionStorage.WorkspaceID;
    const reportId = sessionStorage.ReportId;
    // Construct the export URL
    const exportUrl = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/Export`;
    // const exportUrl = `https://api.powerbi.com/v1.0/myorg/groups/b3690f10-3883-4ac9-b5ab-478d159d7e2d/reports/b28f8ffc-81f6-43a9-bd04-912ea1483068/Export`;
    // console.log(exportUrl);
    // Send a GET request to the export URL
    setIsDownloading(true);
    openModalloader();
    fetch(exportUrl, {
      headers: {
        Authorization: "Bearer " + sessionStorage?.AzureAccessToken,
      },
      method: "GET",
    })
      .then((response) => {
        console.log(response);

        if (response.ok) {
          setIsDownloading(false);
          // closeModalloader();
          console.log("If");
          // If the request is successful, trigger the download
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${sessionStorage.ReportName}.pbix`; // You can specify the file name here
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("Report Downloaded!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,
            });
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        } else {
          console.log("else");
          setIsDownloading(false);
          // closeModalloader();
          // Handle error if the request fails
          openModal();
          // alert(
          //   "You can't download this report. Refer to Power BI documentation for list of download limitations and known issues. <a href='https://learn.microsoft.com/en-us/power-bi/create-reports/service-export-to-pbix' target='_blank'>Click here</a> to visit the documentation."
          // );

          console.error("Failed to download the report.");
        }
      })
      .catch((error) => {
        setIsDownloading(false);
        // closeModalloader();
        openModal();
        console.error("An error occurred:", error);
      });
  };

  React.useEffect(() => {
    if (isDownloading == true) {
      openModalloader();
    } else if (isDownloading == false) {
      closeModalloader();
    }
  }, [isDownloading]);

  // const handleDownloadReport = () => {
  //   const groupId = sessionStorage.WorkspaceID; // Replace with your actual group ID
  //   const reportId = sessionStorage.ReportId; // Replace with your actual report ID

  //   // Construct the export URL
  //   const exportUrl = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/Export`;
  //   // console.log(exportUrl);

  //   // Send a GET request to the export URL
  //   fetch(exportUrl)
  //     .then((response) => {
  //       if (response.ok) {
  //         // If the request is successful, trigger the download
  //         response.blob().then((blob) => {
  //           const url = window.URL.createObjectURL(blob);
  //           const a = document.createElement("a");
  //           a.href = url;
  //           a.download = "report-export.pdf"; // You can specify the file name here
  //           document.body.appendChild(a);
  //           a.click();
  //           window.URL.revokeObjectURL(url);
  //         });
  //       } else {
  //         // Handle error if the request fails
  //         console.error("Failed to download the report.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred:", error);
  //     });
  // };

  const StyledRoot = styled("div")({
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
  });
  const tabledata = JSON.parse(localStorage.getItem("selectedReportName"));
  // console.log(tabledata);
  sessionStorage.setItem("PartitionKey", tabledata?.partitionKey);
  sessionStorage.setItem("RowKey", tabledata?.rowKey);
  sessionStorage.setItem("WorkspaceID", tabledata?.WorkspaceID);
  sessionStorage.setItem("WorkspaceName", tabledata?.WorkspaceName);

  localStorage.getItem("ReportID") && localStorage.getItem("succefullyUpdated")
    ? sessionStorage.setItem(
        "ReportId",
        localStorage.getItem("ReportID").replace(/["]/g, "")
      )
    : sessionStorage.setItem("ReportId", tabledata?.ReportID);
  localStorage.getItem("ReportName") &&
  localStorage.getItem("succefullyUpdated")
    ? sessionStorage.setItem(
        "ReportName",
        localStorage.getItem("ReportName").replace(/["]/g, "")
      )
    : sessionStorage.setItem("ReportName", tabledata?.ReportName);
  return (
    <>
      {" "}
      <StyledRoot>
        <div style={{ width: "100%" }}>
          {isDownloading && (
            <div>
              <Modal
                isOpen={modalIsOpenloder}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModalloader}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div style={{ display: "flex" }}>
                  <CircularProgress sx={{ marginRight: "32px" }} />
                  <div style={{ fontSize: "20px" }}>
                    <b> Exporting to Power BI Desktop(.pbix)</b>
                    <p>
                      {" "}
                      Your Report is exporting to .pbix. This may take a few
                      minutes
                    </p>
                  </div>
                </div>
              </Modal>
            </div>
          )}
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={11} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  m: 1,
                  p: 1,
                  bgcolor: "#007DBB",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  width: "99%",
                  marginTop: "3vh",
                }}
              >
                <Grid container>
                  <Grid item sm={6} lg={8}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ ml: 17 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          src: "Segoe UI Semibold",
                        }}
                      >
                        DataLab - Power BI Embedded Report
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} lg={1} sx={{ ml: 36 }}>
                    {tabledata ? (
                      <>
                        <div style={{ display: "flex", marginLeft: "-20px" }}>
                          {/* <button id="resetButton">Reset Report</button> */}
                          {button1Visible && (
                            <Button
                              sx={{
                                backgroundColor: "#007DBB",
                                color: "white",
                                height: "5vh",
                              }}
                              onClick={() => {
                                toggleEdit();
                                handleButton1Click();
                              }}
                            >
                              Edit
                            </Button>
                          )}
                          {button2Visible && (
                            <div style={{ display: "flex" }}>
                              <Button
                                sx={{
                                  backgroundColor: "#007DBB",
                                  color: "white",
                                  height: "5vh",
                                }}
                                onClick={() => {
                                  toggleView();
                                  handleButton2Click();
                                }}
                              >
                                View
                              </Button>

                              {/* <Button
                                sx={{
                                  backgroundColor: "#007DBB",
                                  color: "white",
                                  height: "5vh",
                                }}
                                onClick={() => {
                                  handleDownloadReport();
                                }}
                              >
                                Download Report
                              </Button> */}
                            </div>
                          )}
                          <DownloadIcon
                            sx={{
                              backgroundColor: "#007DBB",
                              color: "white",
                              height: "5vh",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleDownloadReport();
                            }}
                          />
                        </div>
                        <Modal
                          isOpen={modalIsOpen}
                          // onAfterOpen={afterOpenModal}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <p>
                            You can't download this report.Refer to Power BI
                            documentation for list of download limitations and
                            known issues.
                          </p>
                          <a
                            href="https://learn.microsoft.com/en-us/power-bi/create-reports/service-export-to-pbix"
                            // target="_blank"
                            onClick={closeModal}
                          >
                            https://learn.microsoft.com/en-us/power-bi/create-reports/service-export-to-pbix
                          </a>
                        </Modal>
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          sx={{ marginTop: "-5.5vh" }}
                        >
                          <SignOutButton />
                        </Box>
                      </>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ mt: "-0.7vh" }}
                      >
                        <SignOutButton />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{}}>
            <Box sx={{ flexGrow: 6, ml: 1, mr: 1, height: "100%!important" }}>
              <>
                {tabledata ? (
                  <>
                    {showEdit ? (
                      <div>
                        <div
                          style={{
                            color: "#1976d2",
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            src: "Segoe UI Semibold",
                            marginLeft: "10px",
                            marginBottom: "-22px",
                          }}
                        >
                          Report Name : {sessionStorage.ReportName}
                        </div>
                        <Applatestedit
                          tabledata={tabledata}
                          // style={{ height: "100%" }}
                        />
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            color: "#1976d2",
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            src: "Segoe UI Semibold",
                            marginLeft: "10px",
                            marginBottom: "-22px",
                          }}
                        >
                          Report Name: {sessionStorage.ReportName}
                        </div>
                        <Applatest
                          tabledata={tabledata}
                          // style={{ height: "100%" }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Grid container sx={{ height: "100%", marginTop: "200px" }}>
                      <Grid item sm={6} lg={5}>
                        <Box display="flex" justifyContent="flex-end">
                          <img
                            src={DashboardLogo}
                            style={{ width: 40, height: 40 }}
                            alt="total"
                            loading="lazy"
                          />
                        </Box>
                      </Grid>

                      <Grid item sm={6} lg={6}>
                        <Box display="flex" justifyContent="flex-start">
                          <Typography
                            variant="h6"
                            style={{
                              fontSize: "28px",
                              fontFamily: "UnileverShilling",
                              marginLeft: 8,
                              color: "rgb(0, 31, 130)",
                            }}
                          >
                            Welcome To Datalab
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            </Box>
          </Grid>
        </div>
      </StyledRoot>
    </>
  );
}
