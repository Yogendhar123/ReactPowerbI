import { useState } from "react";
import { SignOutButton } from "../SignOutButton";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Home from "./Home";
import View from "./View";
import Edit from "./Edit";

function Renderpage() {
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => {
    setShowEdit(true);
  };
  const toggleView = () => {
    setShowEdit(false);
  };
  const tabledata = JSON.parse(localStorage.getItem("selectedReportName"));
  return (
    <div className="" style={{ width: "100%" }}>
      <Grid container sx={{ width: "100%" }}>
        <Box style={{ width: "100%" }}>
          <>
            {tabledata ? (
              <>
                <Grid container>
                  <Grid>
                    {/* <Button variant="contained" onClick={toggleEdit}>
                        Edit
                      </Button> */}
                  </Grid>
                </Grid>
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
                    <View tabledata={tabledata} style={{ height: "100%" }} />
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
                      Report Name : {sessionStorage.ReportName}
                    </div>
                    <Edit tabledata={tabledata} style={{ height: "100%" }} />
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ width: "100%" }}>
                  <Home />
                </div>
              </>
            )}
          </>
        </Box>
      </Grid>
    </div>
  );
}

export default Renderpage;
