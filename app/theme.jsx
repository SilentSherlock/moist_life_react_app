"use client"
// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // 蓝色
        },
        secondary: {
            main: '#ffffff', // 白色
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
