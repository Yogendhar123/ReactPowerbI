import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./layouts/dashboard/header/index";
import Nav from "./sideBar";
import ViewReport from "./ViewReport";
import { useEffect } from "react";
import background from "../src/images/background_img.jpg";
import Home from "./update/Home";
import Headerupdate from "./update/Headerupdate";
import Edit from "./update/Edit";
import Renderpage from "./update/Renderpage";
import * as config from "./Configlatest";
import {
  TableServiceClient,
  TableClient,
  AzureSASCredential,
  odata,
} from "@azure/data-tables";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 2;

const StyledRoot = styled("div")({
  display: "flex",
  height: "100%",
  overflow: "hidden",
  // backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
});

export default function Landingpage() {
  const [open, setOpen] = useState(false);
  const [use, Setuse] = useState([]);
 
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav
        openNav={open}
        onCloseNav={() => setOpen(false)}
      />
      <ViewReport />
      {/* <Renderpage /> */}
      {/* <Main>
        <Outlet />
      </Main> */}
    </StyledRoot>
  );
}
