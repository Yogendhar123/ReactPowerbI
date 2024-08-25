import * as React from 'react';
//import axios from "axios";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography, TextField  } from '@mui/material';
//import productsDetails from '../_mock/dashboard_data';
//import ChartDetails from '../_mock/sentiment_chart'
import TopProductsTable from '../sections/@dashboard/app/TopProductsTable';
import RelevancyCalculation from '../sections/@dashboard/app/RelevancyCalculation';
// import TotalProductCard from '../sections/@dashboard/app/TotalProductCard';
import NoOfPost from '../sections/@dashboard/app/NoOfPost';
import SentimentChart from '../sections/@dashboard/app/sentimentChart';
import { getproductDetails } from '../api/DurationApi';


export default function DashboardAppPage() {
  const [details, setDetails] = useState({
    DurationFilter: '',
    from_date:'',
    to_date:''
  });
  //const [chartData, setChartData] = useState([]);
  const [productCounts, setProductCounts] = useState({
    noOfProduct: 0,
    noOfPost: 0,
  });
  
  const [numberData, setNumberData] = useState([]);
  const [askData, setAskData] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartValue, setChartValue] = useState([]);
  const [dateDuration, setDateDuration] = useState(false);
  useEffect(() => {
    if (details.DurationFilter.length > 0) {
      const durationInMonths = details.DurationFilter;

      // Fetch data from /ask endpoint

      //console.log(1)
      // Fetch data from /ask endpoint with selected duration
      getproductDetails(durationInMonths, setAskData, setChartLabel, setChartValue, setProductCounts, setNumberData)

    }
    else {
      // Fetch data from /ask endpoint with selected duration
      getproductDetails(6, setAskData, setChartLabel, setChartValue, setProductCounts, setNumberData)

    }
  }, [details.DurationFilter]);

  const handleChange = (e) => {
    setDateDuration(true)
    // Get the selected duration from the event target's value
    const selectedDuration = e.target.value;

    // // Log the selected duration to the console
    // console.log("Selected Duration:", selectedDuration);
    const current = new Date();
    const to_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    const month = current.getMonth();
    current.setMonth(month - selectedDuration);
    const from_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    // Update the details state by spreading the current state and updating the DurationFilter
    setDetails({ ...details, DurationFilter: selectedDuration,  from_date: from_date, to_date : to_date});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title> Dashboard | Total Energy </title>
      </Helmet>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <Typography variant='h6' >LIFT CONNECT COMMUNITY</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: "1vh" }}>
        <CardContent >
          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="mapfrom-label">Duration</InputLabel>
                <Select
                  label="Duration"
                  name="DurationFilter"
                  value={details?.DurationFilter || ''}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value=""><em>Select Duration</em></MenuItem>
                  <MenuItem value="1">Last 1 month</MenuItem>
                  <MenuItem value="3">Last 3 months</MenuItem>
                  <MenuItem value="6">Last 6 months</MenuItem>
                  <MenuItem value="12">Last 1 year</MenuItem>
                  <MenuItem value="24">Last 2 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {dateDuration &&
            <><Grid item xs={12} lg={2}>
              <FormControl sx={{ width: '100%' }}>
              <TextField
                  id="outlined-read-only-input"
                  label="From Date"
                  value={details.from_date}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={2}>
              <FormControl sx={{ width: '100%' }}>
              <TextField
                id="outlined-read-only-input"
                label="To Date"
                value={details.to_date}
                InputProps={{
                  readOnly: true,
                }}
              />
              </FormControl>
            </Grid></>
            }
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={{ xs: 2, md: 3, lg: 1 }} sx={{ marginTop: "1vh" }}>
        <Grid item xs={12} sm={6} md={3} lg={3.5}>
          <NoOfPost title="Number Of Posts" noOfPost={productCounts.noOfPost} />

        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3.5}>
          <NoOfPost title="Total Products" noOfPost={productCounts.noOfProduct} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={5} >
          <SentimentChart chartLabel={chartLabel} chartValue={chartValue} />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3, lg: 1 }} sx={{ marginTop: "1vh" }}>
        <Grid item xs={12} sm={6} md={3} lg={8}>
          <TopProductsTable title="Top 10 Products" products={askData} />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={4} >
          <RelevancyCalculation title="Relevancy" products={numberData} />
        </Grid>
      </Grid>
    </Box>
  );
}