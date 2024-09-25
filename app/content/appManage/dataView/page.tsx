"use client"
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {GridColDef} from "@mui/x-data-grid";
import RequestAPI from "@/public/api/silentGooseBot/requestAPI";
import api from "../../../../public/api/silentGooseBot/api.json" assert {type: "json"}
import Status from "@/public/api/Status";


interface pageProps {
    phone: string
}
const DataViewPage: React.FC<pageProps> = ({ phone }: pageProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const curPhone = searchParams.get("curPhone");

    // 拉取账号数据
    let resultMap = fetchPhoneData(phone);
    // 构建数据表
    let userTableTuple = buildUserTableColAndRow(resultMap.get("userChats"));
    let channelTableTuple = buildChannelTableColAndRow(resultMap.get("channelChats"));
    let groupTableTuple = buildGroupTableColAndRow(resultMap.get("groupChats"));


    return (
        <div>
            <h2>Phone: {curPhone}</h2>
        </div>
    )
}

function fetchPhoneData(phone: string) {
    let request = new RequestAPI();
    let resultMap = new Map();
    request.postForm(api.getUserChats, {phoneNumber: phone})
        .then(result => {
            if (Status.SUCCESS === result.status) {
                resultMap = result.resultMap
            }
        });
    if (resultMap.size === 0) {
        console.log("there is no data for this phone");
    } else {
        console.log("resultMap size %d", resultMap.size);
    }
    return resultMap;
}

function buildUserTableColAndRow(userChats: []) {
    let columns: GridColDef[] = [];
    // 后续按照需求删减表列数
    columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ]
    // 所有字段都作为表头展示 todo

    let userTableTuple:  [GridColDef[], []] = [columns, userChats];

    return userTableTuple;

}

function buildChannelTableColAndRow(channelChats: []) {
    let columns: GridColDef[] = [];
    // 后续按照需求删减表列数
    columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ]
    // 所有字段都作为表头展示 todo

    let channelTableTuple:  [GridColDef[], []] = [columns, channelChats];

    return channelTableTuple;

}

function buildGroupTableColAndRow(groupChats: []) {
    let columns: GridColDef[] = [];
    // 后续按照需求删减表列数
    columns = [
        { field: "id", headerName: "聊天ID", width: 70 },
        { field: "title", headerName: "聊天对象", width: 130 },
        { field: "unreadCount", headerName: "未读消息数", width: 130 }
    ]
    // 所有字段都作为表头展示 todo

    let groupTableTuple:  [GridColDef[], []] = [columns, groupChats];

    return groupTableTuple;

}

export default DataViewPage;