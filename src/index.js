import ReactDOM from 'react-dom/client';
import React from "react";
import "./index.css";
//
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { BrowserRouter } from "react-router-dom";

msalConfig["auth"]["clientId"] = process.env.REACT_APP_CLIENT_ID;
msalConfig["auth"][
  "authority"
] = `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/`;
const msalInstance = new PublicClientApplication(msalConfig);
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
