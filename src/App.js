import "./App.css";
import { PowerBIEmbed } from "powerbi-client-react";
import * as models from "powerbi-models";
import { useState, useEffect } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Landingpage from "./Landingpage";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import * as config from "./Configlatest";

function App() {
  const [showReport, setShowReport] = useState(false);

  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // const accessTokenRequest = {
    //   scopes: ["user.read"],
    //   account: accounts[0],
    // };
    // instance
    //   .acquireTokenSilent(accessTokenRequest)
    //   .then((accessTokenResponse) => {
    //     // Acquire token silent success
    //     console.log(accessTokenResponse);
    //     let accessToken = accessTokenResponse.accessToken;
    //     // console.log(accessToken)
    //     sessionStorage.setItem("AzureAccessToken", accessToken);

    //     let client_info = accessTokenResponse.client_info;
    //     sessionStorage.setItem("client_info", client_info);
    //     let id_token = accessTokenResponse.client_info;
    //     sessionStorage.setItem("id_token", id_token);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const accessTokenRequest = {
      scopes: config.scopeBase,
      account: accounts[0],
    };
    instance
      .acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse) => {
        // Acquire token silent success
        // console.log(accessTokenResponse);
        let accessToken = accessTokenResponse.accessToken;
        // console.log(accessToken)
        sessionStorage.setItem("AzureAccessToken", accessToken);

        let client_info = accessTokenResponse.client_info;
        sessionStorage.setItem("client_info", client_info);
        let id_token = accessTokenResponse.client_info;
        sessionStorage.setItem("id_token", id_token);

        // fetch(config.powerBiApiUrl +
        //   // "v1.0/myorg/groups/b3690f10-3883-4ac9-b5ab-478d159d7e2d/reports", {
        //     "v1.0/myorg/admin/users/oindrila.banerjee@unilever.com/artifactAccess?artifactTypes=Report", {
        //   headers: {
        //     Authorization: "Bearer " + accessToken,
        //   },
        //   method: "GET",
        // })
        //   .then(function (response) {
        //     if (response.ok) {
        //       response
        //         .json()
        //         .then(function (body) {
        //           // Successful response
        //           if (response.ok) {
        //             console.log(body)
        //           }
        //           // If error message is available
        //           else {

        //             console.error("Error " + response.status + ": " + body.error.code);
        //             // thisObj.setState({ error: errorMessage });
        //           }
        //         })
        //         .catch(function () {
        //           console.error("Error " + response.status + ":  An error has occurred");

        //           // thisObj.setState({ error: errorMessage });
        //         });
        //     } else {
        //       // Too many requests in one hour will cause the API to fail
        //       if (response.status === 429) {
        //         console.error(
        //           "Permissions refresh will be available in up to an hour."
        //         );
        //       } else {
        //         console.error(response);
        //       }
        //     }
        //   })
        //   .catch(function (error) {
        //     console.error("Failure in making API call." + error);
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [instance, accounts, inProgress, apiData]);

  return (
    <div className="">
      <AuthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Landingpage />} />
        </Routes>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
