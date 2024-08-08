"use client"
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Box, Container, Grid, Paper, styled, Typography} from "@mui/material";
import Sidebar from "../public/components/views/sidebar";
import Content from "../public/components/views/content";

function HomePage() {

    const router = useRouter();
    useEffect(function () {
        // if (window.location.pathname === "/") {
        //     // 增加对token的判断
        //     if (localStorage.getItem("moist_token") === null) {
        //         router.push("/login")
        //     }
        // }
    }, [router]);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Content />
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage