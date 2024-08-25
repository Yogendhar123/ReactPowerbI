import axios from "axios";

export function getproductDetails(durationInMonths,setAskData,setChartLabel,setChartValue,setProductCounts,setNumberData) {
    // Fetch data from /ask endpoint with selected duration
    axios
    .post(
      "https://tte-poc-bot-api.azurewebsites.net/UserVoice_Report",
      {
        time: durationInMonths,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      //console.log(response);
      //setAskData(response.data);
      const { noOfProduct, noOfPost,askData,numberData } = response.data;
      setProductCounts({ noOfProduct, noOfPost });
      setAskData(askData);
      setNumberData(numberData);
      //setProductData(ProductData);
      const templabel =[];
        const tempval =[];
      response?.data?.chartData?.map(chartdata => {           
        templabel.push(chartdata.SentimentsLabels)
        tempval.push(chartdata.series)
        return (templabel, tempval)
    })
    setChartLabel(templabel) 
    setChartValue(tempval)
    })
    .catch(function (error) {
      console.log("axiosERROR", error);
    });
}