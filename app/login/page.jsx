'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RequestAPI from "../../public/api/silentGooseBot/requestAPI";
import api from '../../public/api/silentGooseBot/api.json' assert {type: 'json'}
import Status from "../../public/api/Status";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // 简单的登录逻辑
        if (email && password) {
            let request = new RequestAPI();
            request.post(api.login, {
                email: email,
                password: password
            }).then(function (result) {
                if (Status.SUCCESS === result.status) {
                    let token = result.resultMap.token
                    console.log("token:", token);
                    router.push("/");// 跳转到主页面
                }
            })
        }
    };

    return (
        <div>
            <h1>登录页面</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">登录</button>
            </form>
        </div>
    );
}
