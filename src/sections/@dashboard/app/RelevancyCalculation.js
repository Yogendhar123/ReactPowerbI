import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Toolbar,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
// ----------------------------------------------------------------------

RelevancyCalculation.propTypes = {
  products: PropTypes.array.isRequired,
};


export default function RelevancyCalculation({
  title,
  products,
  sx,
  ...other
}) {
  // console.log("shahnaz",products)

  return (
    <Card
      sx={{
        py: 1,
        boxShadow: 0,
        // textAlign: 'center',
        marginTop: "2vh",
        ...sx,
      }}
      {...other}
    >
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={9}>
          <Typography variant="h4" sx={{ ml: 3 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={12}>
          {products.map((item, index) => (
            <Card {...other} key={index} sx={{ backgroundColor: 'whitesmoke', m: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={12}>
                    <Typography fontSize={16}>{item.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={12}>
                    <Typography variant="h6" >{item.number}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}</Grid>
      </Grid>
    </Card>
  );
}

RelevancyCalculation.propTypes = {
  products: PropTypes.array.isRequired,
};
