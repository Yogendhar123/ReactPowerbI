import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Toolbar, Typography, Grid,Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

TopProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
};

export default function TopProductsTable({ title, products,sx, ...other }) {
    //console.log("test1",products)
    const GridColDef = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'product',
            headerName: 'Product Name',
            width: 180,
        },
        {
            field: 'countofposts',
            headerName: 'No of Posts',
            width: 180,
        },
        {
            field: 'Most_Common_Sentiment',
            headerName: 'Sentiment',
            width: 150,
        }
        // ,
        // {
        //     field: 'Activity',
        //     headerName: 'Activity',
        //     width: 150,
        // }
    ];
    
    return (
        <Card {...other} style={{width: "100%"}}
                sx={{
                    py: 1,
                    boxShadow: 0,
                    marginTop: "2vh",
                    ...sx,
                }} >
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 1 }}>{title}</Typography>
                        <DataGrid fullWidth
                        sx={{fontSize:16,height:400, mt:3}}
                            rows={products}
                            columns={GridColDef}
                            getRowId={(row) => row.id}
                            //getRowId={(row) =>  row._ID}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            
                            pageSizeOptions={[5]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </CardContent>
                </Card>
    );
}
