import axios from "axios";
import {Component} from "react";


export default class RequestAPI extends Component{

    // 构建axios client
    constructor(props) {
        super(props);
        const urlMap = new Map();
        console.log("Request API init");
        urlMap.set("dev", "http://localhost:8080");
        console.log("Env ", process.env.NEXT_PUBLIC_APP_ENV);
        // urlMap.set("prd", "http://localhost:8080");
        const client = axios.create({
            baseURL: urlMap.get(process.env.NEXT_PUBLIC_APP_ENV),
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

    async postJson(url, data) {
        console.log("baseUrl", this.state.client.defaults.baseURL);
        try {
            let response = await this.state.client.post(url, data, {headers: {"Content-Type": "application/json"}});
            if (response.status === 200) {
                console.log("Post Success");
                console.log("response " + response.resultMap);
                return response.data;
            } else {
                console.log("Post Error %S", response.status);
            }


        } catch (e) {
            console.error(e);
        }
    }

    async postForm(url, data) {
        console.log("baseUrl", this.state.client.defaults.baseURL);
        try {
            let response = await this.state.client.post(url, data, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
            if (response.status === 200) {
                console.log("Post Success");
                return response.data;
            } else {
                console.log("Post Error %S", response.status);
            }


        } catch (e) {
            console.error(e);
        }
    }
}



