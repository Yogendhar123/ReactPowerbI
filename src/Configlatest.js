export const authorityUrl =
  "https://login.microsoftonline.com/f66fae02-5d36-495b-bfe0-78a6ff9f8e6e/";

// End point URL for Power BI API
export const powerBiApiUrl = "https://api.powerbi.com/";

// Scope for securing access token
export const scopeBase = [
  "https://analysis.windows.net/powerbi/api/Report.ReadWrite.All",
   // "https://analysis.windows.net/powerbi/api/Report.Execute.All"
  // "https://analysis.windows.net/powerbi/api/Tenant.ReadWrite.All"
];

// Client Id (Application Id) of the AAD app.
export const clientId = "a757b570-6c06-4c75-b125-78827f7a4bae";

// Id of the workspace where the report is hosted
// export const workspaceId = sessionStorage.getItem("WorkspaceId")
//   ? sessionStorage.getItem("WorkspaceId")
//   : "";

// // Id of the report to be embedded
// export const reportId = sessionStorage.getItem("ReportId")
//   ? sessionStorage.getItem("ReportId")
//   : "";

export const workspaceId = sessionStorage.getItem("WorkspaceID")
  ? sessionStorage.getItem("WorkspaceID")
  : "";

// Id of the report to be embedded
export const reportId = sessionStorage.getItem("ReportId")
  ? sessionStorage.getItem("ReportId")
  : "";
