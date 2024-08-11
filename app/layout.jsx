"use client"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import {Box, Container} from "@mui/material";
import Sidebar from "../public/components/views/sidebar";

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <head>
                <title>MoistLife</title>
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex' }}>
                            <Sidebar />
                            <Box sx={{ flexGrow: 1, p: 3 }}>
                                {/*用来插入href跳转的页面*/}
                                {children}
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </body>
        </html>
    )
}