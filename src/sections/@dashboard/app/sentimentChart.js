import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Toolbar, Grid } from '@mui/material';
import ReactApexChart from "react-apexcharts";

function SentimentChart({ chartLabel, chartValue, sx, ...other }) {

    const sentimentGraph = {
        options: {
            chart: {
                width: 180,
                type: 'pie',
            },
            colors: ['#1AA7EC', '#7FFF00', '#FF0000'],
            labels: chartLabel,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'

                    }
                }
            }]
        },
        series: chartValue,
    };

    return (

        <Card
            sx={{
                py: 1,
                boxShadow: 0,
                textAlign: 'center',
                marginTop: "2vh",
                ...sx,
            }}
            {...other}
        >
            <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={9}>
                    <ReactApexChart
                        options={sentimentGraph.options} series={sentimentGraph.series} type="pie" height={200} width={310} />
                </Grid>
            </Grid>

        </Card>
    )
}
SentimentChart.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default SentimentChart