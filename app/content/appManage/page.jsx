"use client"

import {Box, Grid} from "@mui/material";
import RequestAPI from "../../../public/api/silentGooseBot/requestAPI";
import api from "../../../public/api/silentGooseBot/api" assert {type: "json"}
import Status from "../../../public/api/Status";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import UserCard from "../../../public/components/views/userCard";
import VerifyModal from "../../../public/components/views/verifyModal";
import {equal} from "node:assert";

export default function AppModule() {

    // 初始化变量状态
    const [tgAccounts, setTgAccounts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("WaitCode");
    const [accountState, setAccountState] = useState([]);

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
                    setTgAccounts(result.resultMap.tgAccounts);
                    console.log("get tgAccounts %d", tgAccounts.length);
                    setAccountState(new Array(tgAccounts.length).fill("0"));
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

    // 登录账号
    function cardLogin() {
        // todo 修改card显示的字样状态
        setModalOpen(true);

    }

    function handleModalLogin(phone, code, password) {
        setModalOpen(true);
        // todo 调整card显示的字样状态
        let request = new RequestAPI();
        let curCardIndex = null;
        tgAccounts.forEach((account, index) => {
            if (account.phone === phone) curCardIndex = index;
        });
        if (null === curCardIndex) {
            console.error("未获取到当前卡片的index %s phone %s", curCardIndex, phone);
            return;
        }
        request.post(api.appStart, {
            phone: phone,
            waitCode: code,
            waitPassword: password,
            state: accountState[curCardIndex]
        }).then(result => {
            if (Status.SUCCESS === result.resultMap.status) {
                // 需要输入验证码
                if ("1" === result.resultMap.state) {
                    // todo
                }
            }
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{xs: 4, sm: 8, md: 12}} >
                {
                    tgAccounts.map(account => (
                        <Grid item xs={2} sm={4} md={4} >
                            <AccountCard
                                imageUrl={account.imageUrl}
                                avatarName={account.avatarName}
                                username={account.username}
                                phone={account.phone}
                                onClickLogin={cardLogin}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <VerifyModal open={modalOpen} title={modalTitle}>
            </VerifyModal>
        </Box>
    );
}