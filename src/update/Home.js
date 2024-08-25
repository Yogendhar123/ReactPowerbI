import { SignOutButton } from "../SignOutButton";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import DashboardLogo from "../images/dashboardLogo.svg";
import background from "../images/background_img.jpg";
import { styled } from "@mui/material/styles";

function Home() {
  const StyledRoot = styled("div")({
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
  });
  return (
    <StyledRoot>
      <div className="" style={{ width: "100%" }}>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={11} lg={12}>
            <Box
              sx={{
                display: "flex",
                m: 1,
                p: 1,
                bgcolor: "#007DBB",
                // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
                width: "99%",
                // height: "5vh!important",
                marginTop: "3vh",
                // marginLeft:"28vh"
                //   height: "auto!important",10
              }}
            >
              <Grid container>
                <Grid item sm={6} lg={8}>
                  <Box display="flex" justifyContent="flex-end" sx={{ ml: 17 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontFamily: "Segoe UI",
                        fontWeight: "600",
                        src: "Segoe UI Semibold",
                      }}
                    >
                      DataLab Power BI Embedded Report
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} lg={1} sx={{ ml: 36 }}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ mt: "-0.7vh" }}
                  >
                    {/* <Button
                          sx={{
                            backgroundColor: "#007DBB",
                            color: "white",
                            height: "5vh",
                          }}
                          onClick={toggleEdit}
                        >
                          View
                        </Button> */}
                    <SignOutButton />
                  </Box>
                </Grid>
                {/* <Grid item sm={6} lg={1} sx={{marginTop: "-1vh"}}>
                                    <Box display="flex" justifyContent="flex-end" >
                                        <SignOutButton />
                                    </Box>
                                </Grid> */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
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
      </div>
    </StyledRoot>
  );
}

export default Home;
