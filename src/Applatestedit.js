// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

import { InteractionType, EventType } from "@azure/msal-browser";
import { MsalContext } from "@azure/msal-react";
import React from "react";
import { service, factories, models } from "powerbi-client";
import "./App.css";
import * as config from "./Configlatest";
import { PowerBIEmbed } from "powerbi-client-react";
import { ReportId } from "./config";
import {
  TableServiceClient,
  TableClient,
  AzureSASCredential,
  odata,
} from "@azure/data-tables";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Applatest from "./Applatest";

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


const update = async (newreport1, props) => {
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
  const entity = {
    partitionKey: sessionStorage?.PartitionKey,
    rowKey: sessionStorage?.RowKey,
    ReportID: sessionStorage?.getItem("ReportId"),
    WorkspaceID: sessionStorage?.WorkspaceID,
    ReportName: sessionStorage?.getItem("ReportName"),
    WorkspaceName: sessionStorage?.getItem("WorkspaceName"),
  };
  console.log(entity);
  await tableClient
    .updateEntity(entity, "Replace")
    .then(() => {
      localStorage.setItem("succefullyUpdated", true);
      window.location.reload(false);
    })
    .catch((error) => {
      console.log("Report is missing");
    });
};

class Applatestedit extends React.Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);

    this.state = { accessToken: "", embedUrl: "", error: [] };

    reportRef = React.createRef();

    // Report container
    loading = (
      <div>
        <div id="reportContainer" ref={reportRef}>
          Loading the report...
        </div>
        <ToastContainer />
        {/* <button id="resetButton">Reset Report</button> */}
        {localStorage.getItem("succefullyUpdated") ? (
          <>
            <Applatest
              tabledata={JSON.parse(localStorage.getItem("selectedReportName"))}
            // style={{ height: "100%" }}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }

  // React function
  render() {
    if (this.state.error.length) {
      // Cleaning the report container contents and rendering the error message in multiple lines
      reportContainer.textContent = "";
      this.state.error.forEach((line) => {
        reportContainer.appendChild(document.createTextNode(line));
        reportContainer.appendChild(document.createElement("br"));
      });
    } else if (this.state.accessToken !== "" && this.state.embedUrl !== "") {
      const embedConfiguration = {
        type: "report",
        tokenType: models.TokenType.Aad,
        accessToken,
        embedUrl,
        // permissions: models.Permissions.All,
        permissions: models.Permissions.Copy,
        viewMode: models.ViewMode.Edit,
        // id: config.reportId,
        id: sessionStorage.ReportId,
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
      report.on("saved", function (event) {
        const newReportId = event.detail.reportObjectId;
        const reportName = event.detail.reportName;
        const workspaceId = sessionStorage?.WorkspaceID;

        const check_save_as = event.detail.saveAs;
        if (check_save_as === true) {
          if (sessionStorage.getItem("ReportId")) {
            sessionStorage.setItem("ReportId", newReportId);
            localStorage.setItem("ReportID", JSON.stringify(newReportId));
            localStorage.setItem("ReportName", JSON.stringify(reportName));
            sessionStorage.setItem("ReportName", reportName);
            var existing = localStorage.getItem("selectedReportName");

            existing = existing ? JSON.parse(existing) : {};
            existing["ReportName"] = reportName;
            existing["ReportID"] = newReportId;
            existing["WorkspaceID"] = workspaceId;

            localStorage.setItem(
              "selectedReportName",
              JSON.stringify(existing)
            );
          }
          update(newReportId);

        } else {
          localStorage.setItem("succefullyUpdated", true);
          window.location.reload(false);
        }
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
    if (sessionStorage.WorkspaceId === "" || sessionStorage.ReportId === "") {
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

export default Applatestedit;
