"use client"

import {Box, Grid} from "@mui/material";
import RequestAPI from "../../../public/api/silentGooseBot/requestAPI";
import api from "../../../public/api/silentGooseBot/api" assert {type: "json"}
import Status from "../../../public/api/Status";
import {useEffect} from "react";
import {styled} from "@mui/material/styles";
import UserCard from "../../../public/components/views/userCard";

export default function AppModule() {

    let tdAccounts = [];

    // 初始化组件状态
    useEffect(() => {
        getTdAccount();
    },[]);

    // 获取账户信息
    function getTdAccount() {
        let request = new RequestAPI();
        request.post(api.getAllTgAccount, {})
            .then(result => {
                if (Status.SUCCESS === result.status) {
                    tdAccounts = result.dataMap.tgAccounts;
                    console.log("get tgAccounts %d", tdAccounts.length);
                } else if (Status.FALSE === result.status) {
                    console.log("获取用户列表失败");
                }
            });
    }

    const AccountCard = styled(UserCard)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{xs: 4, sm: 8, md: 12}} >
                {
                    tdAccounts.map(acccount => (
                        <Grid item xs={2} sm={4} md={4} >
                            <AccountCard
                                imageUrl={acccount.imageUrl}
                                avatarName={acccount.avatarName}
                                username={acccount.username}
                                phone={acccount.phone}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}