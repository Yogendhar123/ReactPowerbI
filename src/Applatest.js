import { InteractionType, EventType } from "@azure/msal-browser";
import { MsalContext } from "@azure/msal-react";
import React from "react";
import { service, factories, models } from "powerbi-client";
import "./App.css";
import * as config from "./Configlatest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TableServiceClient,
  TableClient,
  AzureSASCredential,
  odata,
} from "@azure/data-tables";

const powerbi = new service.Service(
  factories.hpmFactory,
  factories.wpmpFactory,
  factories.routerFactory
);

let accessToken = "";
let embedUrl = "";
let reportContainer;
let reportRef;
let loading;

class Applatest extends React.Component {
  static contextType = MsalContext;

  constructor(props) {
    if (localStorage.getItem("succefullyUpdated")) {
      toast.success("Report Updated!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      // localStorage.removeItem("succefullyUpdated");
      // localStorage.removeItem("ReportID");
      // localStorage.removeItem("ReportName");
      let keysToRemoveEdit = ["ReportID" , "ReportName","succefullyUpdated"];
      keysToRemoveEdit.forEach(k =>
      localStorage.removeItem(k))
    }
    super(props);
    console.log(props);
    this.state = { accessToken: "", embedUrl: "", error: [] };
    reportRef = React.createRef();
    // Report container
    loading = (
      <div>
        {/* <button onClick={this.exportReport}>Export Report</button> */}

        <div id="reportContainer" ref={reportRef}>
          Loading the report...
        </div>
        <ToastContainer />
      </div>
    );
  }

  exportReport = () => {
    if (accessToken && embedUrl) {
      const report = powerbi.get(reportContainer);

      if (report) {
        report
          .getFilters()
          .then((filters) => {
            const exportDataRequest = {
              format: "PDF", // Change to the desired export format
              filters,
            };

            report.setFilters([]); // Clear any filters temporarily

            report
              .exportData(exportDataRequest)
              .then((result) => {
                console.log("Report exported successfully", result);
                // You can display a success message to the user if needed.
              })
              .catch((error) => {
                console.error("Error exporting report", error);
                // You can display an error message to the user if needed.
              })
              .finally(() => {
                // Restore the original filters after export
                report.setFilters(filters);
              });
          })
          .catch((error) => {
            console.error("Error getting filters", error);
            // You can display an error message to the user if needed.
          });
      } else {
        console.error("Report not embedded or not ready for export");
        // You can display an error message to the user if needed.
      }
    } else {
      console.error("Access token or embed URL not available");
      // You can display an error message to the user if needed.
    }
  };

  // React function
  render() {
    if (this.state.error.length) {
      // Cleaning the report container contents and rendering the error message in multiple lines
      reportContainer.textContent = "";
      this.state.error.forEach((line) => {
        reportContainer.appendChild(document.createTextNode(line));
        reportContainer.appendChild(document.createElement("br"));
      });
    //   const newDiv = reportContainer.appendChild(document.createElement("div"))
    //   newDiv.setAttribute("id", "err_div");
    //   newDiv.appendChild(document.createTextNode(this.state.error[0]));
  
    // this.state.error.slice(1).forEach((line) => {
    //   reportContainer.appendChild(document.createTextNode(line));
    //   reportContainer.appendChild(document.createElement("br"));
    // });
    } else if (this.state.accessToken !== "" && this.state.embedUrl !== "") {
      console.log(this.state)
      const embedConfiguration = {
        type: "report",
        tokenType: models.TokenType.Aad,
        accessToken,
        embedUrl,
        // id: config.reportId,
        id: sessionStorage.ReportId,
        /*
                // Enable this setting to remove gray shoulders from embedded report
                settings: {
                    background: models.BackgroundType.Transparent
                }
                */
      };

      const report = powerbi.embed(reportContainer, embedConfiguration);

      // Clear any other loaded handler events
      report.off("loaded");

      // Triggers when a content schema is successfully loaded
      report.on("loaded", function () {
        console.log("Report load successful");
      });

      // Clear any other rendered handler events
      report.off("rendered");

      // Triggers when a content is successfully embedded in UI
      report.on("rendered", function () {
        console.log("Report render successful");
      });

      // Clear any other error handler event
      report.off("error");

      // Below patch of code is for handling errors that occur during embedding
      report.on("error", function (event) {
        const errorMsg = event.detail;

        // Use errorMsg variable to log error in any destination of choice
        console.error(errorMsg);
      });
    }

    return loading;
  }

  // React function
  componentDidMount() {
    if (reportRef !== null) {
      reportContainer = reportRef["current"];
    }

    // User input - null check
    // if (config.workspaceId === "" || config.reportId === "") {
    if (sessionStorage.WorkspaceID === "" || sessionStorage.ReportId === "") {
      this.setState({
        error: [
          "Please assign values to workspace Id and report Id in Config.ts file",
        ],
      });
      return;
    }

    this.authenticate();
  }

  // React function
  componentDidUpdate() {
    this.authenticate();
  }

  // React function
  componentWillUnmount() {
    powerbi.reset(reportContainer);
  }

  // Authenticating to get the access token
  authenticate() {
    const msalInstance = this.context.instance;
    const msalAccounts = this.context.accounts;
    const msalInProgress = this.context.inProgress;
    const isAuthenticated = this.context.accounts.length > 0;

    if (this.state.error.length > 0) {
      return;
    }

    const eventCallback = msalInstance.addEventCallback((message) => {
      if (message.eventType === EventType.LOGIN_SUCCESS && !accessToken) {
        const payload = message.payload;
        const name = payload.account?.name ? payload.account?.name : "";

        accessToken = payload.accessToken;
        this.setUsername(name);
        this.tryRefreshUserPermissions();
      }
    });

    const loginRequest = {
      scopes: config.scopeBase,
      account: msalAccounts[0],
    };

    if (!isAuthenticated && msalInProgress === InteractionType.None) {
      msalInstance.loginRedirect(loginRequest);
    } else if (isAuthenticated && accessToken && !embedUrl) {
      this.getembedUrl();
      msalInstance.removeEventCallback(eventCallback);
    } else if (
      isAuthenticated &&
      !accessToken &&
      !embedUrl &&
      msalInProgress === InteractionType.None
    ) {
      this.setUsername(msalAccounts[0].name);

      // get access token silently from cached id-token
      msalInstance
        .acquireTokenSilent(loginRequest)
        .then((response) => {
          accessToken = response.accessToken;
          this.getembedUrl();
        })
        .catch((error) => {
          // Refresh access token silently from cached id-token
          // Makes the call to handleredirectcallback
          if (
            error.errorCode === "consent_required" ||
            error.errorCode === "interaction_required" ||
            error.errorCode === "login_required"
          ) {
            msalInstance.acquireTokenRedirect(loginRequest);
          } else if (error.errorCode === "429") {
            this.setState({
              error: [
                "Our Service Token Server (STS) is overloaded, please try again in sometime",
              ],
            });
          } else {
            this.setState({
              error: [
                "There was some problem fetching the access token" +
                  error.toString(),
              ],
            });
          }
        });
    }
  }

  // Power BI REST API call to refresh User Permissions in Power BI
  // Refreshes user permissions and makes sure the user permissions are fully updated
  // https://docs.microsoft.com/rest/api/power-bi/users/refreshuserpermissions
  tryRefreshUserPermissions() {
    fetch(config.powerBiApiUrl + "v1.0/myorg/RefreshUserPermissions", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      method: "POST",
    })
      .then(function (response) {
        if (response.ok) {
          console.log("User permissions refreshed successfully.");
        } else {
          // Too many requests in one hour will cause the API to fail
          if (response.status === 429) {
            console.error(
              "Permissions refresh will be available in up to an hour."
            );
          } else {
            console.error(response);
          }
        }
      })
      .catch(function (error) {
        console.error("Failure in making API call." + error);
      });
  }

  // Power BI REST API call to get the embed URL of the report
  getembedUrl() {
    const thisObj = this;
    console.log(this.props.tabledata);

    fetch(
      config.powerBiApiUrl +
        "v1.0/myorg/groups/" +
        // config.workspaceId +
        this.props.tabledata.WorkspaceID +
        "/reports/" +
        // config.reportId,
        this.props.tabledata.ReportID,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        method: "GET",
      }
    )
      .then(function (response) {
        const errorMessage = [];
        errorMessage.push(
          "Error occurred while fetching the embed URL of the report"
        );
      //   errorMessage.push(
      //    "Unauthorized Access For This Report."
      //  );
      //  errorMessage.push(
      //    "Please Connect with Admin Team For Access Related Issues."
      //  );
        errorMessage.push("Request Id: " + response.headers.get("requestId"));

        response
          .json()
          .then(function (body) {
            // Successful response
            if (response.ok) {
              embedUrl = body["embedUrl"];
              thisObj.setState({
                accessToken: accessToken,
                embedUrl: embedUrl,
              });
            }
            // If error message is available
            else {
              errorMessage.push(
                "Error " + response.status + ": " + body.error.code
              );

              thisObj.setState({ error: errorMessage });
            }
          })
          .catch(function () {
            errorMessage.push(
              "Error " + response.status + ":  An error has occurred"
            );

            thisObj.setState({ error: errorMessage });
          });
      })
      .catch(function (error) {
        // Error in making the API call
        thisObj.setState({ error: error });
      });
  }

  // Show username in the UI
  setUsername(username) {
    const welcome = document.getElementById("welcome");
    if (welcome !== null) welcome.innerText = "Welcome, " + username;
  }
}

export default Applatest;
