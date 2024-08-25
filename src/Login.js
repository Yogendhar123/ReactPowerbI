import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import * as models from "powerbi-models";
import { useEffect, useState } from "react";

const Login = (props) => {
  const [getreport, setgetreport] = useState();
  const { instance, accounts } = useMsal();
  const [use, Setuse] = useState([]);

  const handleLogin = () => {
    const activeAccount = instance.getActiveAccount();
    if (!activeAccount) {
      instance
        .loginRedirect(loginRequest)
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <div>
        <button style={{}} class="" onClick={handleLogin}>
          Launch DataLab
        </button>
      </div>
    </div>
  );
};

export default Login;
