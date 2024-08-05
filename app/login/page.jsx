'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import RequestAPI from "../../public/api/silentGooseBot/requestAPI";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // 简单的登录逻辑
        if (username && password) {
            let request = new RequestAPI();
            request.get()
        }
    };

    return (
        <div>
            <h1>登录页面</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
