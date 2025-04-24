"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import RequestAPI from "@/public/api/silentGooseBot/requestAPI";
import api from "../../../../public/api/silentGooseBot/api.json" assert {type: "json"};
import Status from "@/public/api/Status";
import { Box, Divider, Paper, Stack } from "@mui/material";

export default function DataViewPage () {
    /*const router = useRouter();
    const searchParams = useSearchParams();
    const curPhone = searchParams.get("curPhone");

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        const resultMap = fetchPhoneData(phoneNumber);
        const userTableTuple = buildUserTableColAndRow(resultMap.get("userChats"));
        const channelTableTuple = buildChannelTableColAndRow(resultMap.get("channelChats"));
        const groupTableTuple = buildGroupTableColAndRow(resultMap.get("groupChats"));
        setDataList([userTableTuple, channelTableTuple, groupTableTuple]);
    }, [phoneNumber]);

    const paginationModel = { page: 0, pageSize: 5 };*/

    return (
        <div>
            {/*<Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                {dataList.map((item, index) => (
                    <Paper sx={{ height: 450, width: "100%" }} key={index}>
                        <DataGrid
                            columns={item[0]}
                            rows={item[1]}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                ))}
            </Stack>*/}
        </div>
    );
};

function fetchPhoneData(phone) {
    const request = new RequestAPI();
    const resultMap = new Map();
    request.postForm(api.getUserChats, { phoneNumber: phone })
        .then(result => {
            if (Status.SUCCESS === result.status) {
                resultMap.set("userChats", result.resultMap.userChats || []);
                resultMap.set("channelChats", result.resultMap.channelChats || []);
                resultMap.set("groupChats", result.resultMap.groupChats || []);
            }
        });
    return resultMap;
}

function buildUserTableColAndRow(userChats) {
    const columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ];
    return [columns, userChats || []];
}

function buildChannelTableColAndRow(channelChats) {
    const columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ];
    return [columns, channelChats || []];
}

function buildGroupTableColAndRow(groupChats) {
    const columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ];
    return [columns, groupChats || []];
}
