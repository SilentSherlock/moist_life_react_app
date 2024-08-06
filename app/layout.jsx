import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <head>
                <title>MoistLife</title>
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}