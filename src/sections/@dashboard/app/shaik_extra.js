// @mui
import PropTypes from 'prop-types';
import { useState } from 'react';
//import { Card, Typography, Grid } from '@mui/material';
import { Card, CardContent, Toolbar, Typography, Grid, FormControl } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

const options = [
    'None'
];

const ITEM_HEIGHT = 48;
// ----------------------------------------------------------------------

TotalProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    noOfProduct: PropTypes.number.isRequired,
    sx: PropTypes.object,
};
// ----------------------------------------------------------------------
export default function TotalProductCard({ title, noOfProduct,products, sx, ...other }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                marginTop: "1vh",
                ...sx,
            }}
            {...other}
        >
            <Grid container spacing={1} >
                <Grid item xs={6} sm={6} md={6} lg={8}>
                    <Typography variant='h6' sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={4}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={6} sm={6} md={6} >
                        <Typography variant='h3' sx={{ color: "blue", ml: 5 }}>{noOfProduct}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant='h6' sx={{ mt: 2 }}>Products</Typography>
                    </Grid>
                </Grid>
                <hr style={{ opacity: 0.5 }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    {products.map((item, index) => (
        <Box key={index} sx={{ mx: 2, textAlign: 'center' }}>
            <Typography>{item.name}</Typography>
            <Typography variant="h6">{item.number}</Typography>
        </Box>
    ))}
</Box>

        </Card>
    );
}
TotalProductCard.propTypes = {
    products: PropTypes.array.isRequired,
};
