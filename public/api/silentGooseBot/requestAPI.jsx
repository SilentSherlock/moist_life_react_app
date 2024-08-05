import axios from "axios";
import {Component} from "react";


export default class RequestAPI extends Component{

    // 构建axios client
    constructor(props) {
        super(props);
        const urlMap = new Map();
        urlMap.set("dev", "http://localhost:8080");
        // urlMap.set("prd", "http://localhost:8080");
        const client = axios.create({
            baseURL: urlMap.get(process.env.NODE_ENV),
            timeout: 10000
        });

        this.state = {
            client: client
        }

    }

    async get(url) {
        try {
            await this.state.client.get(url, (response) => {
                if (response.status === 200) {
                    console.log("get success");
                    return response.data;
                } else {
                    console.log("Get Error %s", response.status);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    async post(url, data) {
        try {
            let response = await this.state.client.post(url, data);
            if (response.status === 200) {
                console.log("Post Success");
            } else {
                console.log("Post Error %S", response.status);
            }


        } catch (e) {
            console.error(e);
        }
    }
}



