"use client"

import {Box, Button, Grid} from "@mui/material";
import RequestAPI from "../../../public/api/silentGooseBot/requestAPI";
import api from "../../../public/api/silentGooseBot/api" assert {type: "json"}
import Status from "../../../public/api/Status";
import React, {createContext, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import UserCard from "../../../public/components/views/userCard";
import VerifyModal from "../../../public/components/views/verifyModal";
import {useRouter} from "next/navigation";

export default function AppModule() {

    // 初始化变量状态
    const [tgAccounts, setTgAccounts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("WaitCode");
    const [phone, setPhone] = useState("");
    const [accountStates, setAccountStates] = useState([]);
    const [curCardIndex, setCurCardIndex] = useState(0);


    const router = useRouter();
    // const phoneContext = createContext();

    // 初始化组件状态
    useEffect(() => {
        getTdAccount();
    },[]);

    // 获取账户信息
    function getTdAccount() {
        let request = new RequestAPI();

        if (process.env.NEXT_PUBLIC_APP_ENV === "test") {
            let testTgAccounts = [];
            let testResultJson = {
                imageUrl: "",
                avatarName: "Sherlock",
                username: "@Sherlock",
                phone: "+12345678"
            }
            testTgAccounts.push(testResultJson);
            setTgAccounts(testTgAccounts);
            setAccountStates(new Array(testTgAccounts.length).fill("0"));

        } else {
            request.postJson(api.getAllTgAccount, {})
                .then(result => {
                    if (Status.SUCCESS === result.status) {
                        setTgAccounts(result.resultMap.tgAccounts);
                        console.log("get tgAccounts %d", result.resultMap.tgAccounts.length);
                        setAccountStates(new Array(result.resultMap.tgAccounts.length).fill("0"));
                    } else if (Status.FALSE === result.status) {
                        console.log("获取用户列表失败");
                    }
                });
        }

    }

    const AccountCard = styled(UserCard)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // 登录账号
    function cardLogin(phone, curAccountIndex) {
        // todo 修改card显示的字样状态
        console.log("cardLogin")
        setModalOpen(true);
        setPhone(phone);
        setCurCardIndex(curAccountIndex);
        handleModalLogin(phone, "", "");
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
        console.log("phone %s code %s password %s state %s", phone, code, password, accountStates[curCardIndex]);

        if (process.env.NEXT_PUBLIC_APP_ENV === "test") {

            switch (accountStates[curCardIndex]) {
                case "0":
                    setModalTitle("WaitCode");
                    accountStates[curCardIndex] = "1";
                    setAccountStates(accountStates);
                    break;
                case "1":
                    setModalTitle("WaitPassword");
                    accountStates[curCardIndex] = "2";
                    setAccountStates(accountStates);
                    break;
                case "2":
                    console.log("login successfully");
                    setModalOpen(false);
                    router.push(
                        "/content/appManage/dataView?phone=" + phone,
                        {
                            phone: phone
                        }
                    );

                    break;

            }

        } else {
            request.postForm(api.appStart, {
                phone: phone,
                waitCode: code,
                waitPassword: password,
                state: accountStates[curCardIndex]
            }).then(result => {
                if (Status.SUCCESS === result.status) {
                    if ("1" === result.resultMap.state) {
                        // 需要输入验证码
                        setModalTitle("WaitCode");
                        accountStates[curCardIndex] = "1";
                        setAccountStates(accountStates);
                    } else if ("2" === result.resultMap.state) {
                        // 需要输入两步验证码
                        setModalTitle("WaitPassword");
                        accountStates[curCardIndex] = "2";
                        setAccountStates(accountStates);
                    } else if ("3" === result.resultMap.state) {
                        // 已登录成功
                        setModalOpen(false);
                        console.log("login success");
                        router.push("/content/appManage/dataView");
                    }
                } else {
                    console.log("Request login failed");
                }
            })
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{xs: 4, sm: 8, md: 12}} >
                {
                    tgAccounts.map((account, curAccountIndex) => (
                        <Grid item xs={2} sm={4} md={4} key={curAccountIndex}>
                            <AccountCard
                                imageUrl={account.imageUrl}
                                avatarName={account.avatarName}
                                username={account.username}
                                phone={account.phone}
                                onClickLogin={() => cardLogin(account.phone, curAccountIndex)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <VerifyModal modalOpen={modalOpen} title={modalTitle} initPhone={phone} initAccountState={accountStates[curCardIndex]} handleSubmit={handleModalLogin}>
                <Button variant="contained" color="secondary" onClick={() => {setModalOpen(false)}}>
                    关闭
                </Button>
            </VerifyModal>
        </Box>
    );
}