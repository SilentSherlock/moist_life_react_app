'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RequestAPI from "../../public/api/silentGooseBot/requestAPI";
import api from '../../public/api/silentGooseBot/api.json' assert {type: 'json'}
import Status from "../../public/api/Status";
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";

function LockOutlinedIcon() {
    return null;
}

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // 简单的登录逻辑
        if (email && password) {
            let request = new RequestAPI();
            request.postJson(api.login, {
                email: email,
                password: password
            }).then(function (result) {
                if (Status.SUCCESS === result.status) {
                    let token = result.resultMap.token
                    console.log("token:", token);
                    localStorage.setItem("moist_token", token);
                    router.push("/");// 跳转到主页面
                }
            })
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    登录
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="电子邮件地址"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}

                    >
                        登录
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                忘记密码?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"没有账号? 注册"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
