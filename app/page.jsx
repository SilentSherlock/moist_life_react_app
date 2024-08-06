"use client"
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function HomePage() {

    const router = useRouter();
    useEffect(function () {
        if (window.location.pathname === "/") {
            // 增加对token的判断
            if (localStorage.getItem("moist_token") === null) {
                router.push("/login")
            }
        }
    }, [router]);

    return <div>Welcome to Next.js!</div>
}

export default HomePage