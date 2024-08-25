// @mui
import PropTypes from 'prop-types';
import { Card, Typography, Grid, Box } from '@mui/material';
// ----------------------------------------------------------------------

NoOfPost.propTypes = {
    title: PropTypes.string.isRequired,
    noOfPost: PropTypes.number.isRequired,
    sx: PropTypes.object,
};
// ----------------------------------------------------------------------
export default function NoOfPost({ title, noOfPost, sx, ...other }) {
    return (
        <Card
            sx={{
                py: 3.7,
                boxShadow: 0,
                textAlign: 'center',
                marginTop: "2vh",
                backgroundColor: "#8AC7DB",
                ...sx,
            }}
            {...other}
        >
            <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={9}>
                    <Typography variant='h4' sx={{ ml: 1, color: "white" }}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={4}>
                        <Typography variant='h4' sx={{ color: "white", ml: 2, mt: 7 }}>{noOfPost}</Typography>
                    </Grid>

                </Grid>
                <hr style={{ opacity: 0.5, color: "white" }} />
            </Box>
        </Card>
    );
}
