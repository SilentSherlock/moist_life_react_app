// components/Content.js
import * as React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Content = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Used Space</Typography>
                            <Typography variant="h4">49/50 GB</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Revenue</Typography>
                            <Typography variant="h4">$34,245</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Messages</Typography>
                            <Typography variant="h4">75</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Item>
                            <Typography variant="h6">Followers</Typography>
                            <Typography variant="h4">+245</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Global Sales by Top Locations</Typography>
                            {/* Add your chart component here */}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Content;
