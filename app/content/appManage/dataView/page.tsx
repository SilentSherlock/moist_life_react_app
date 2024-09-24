"use client"
import React from "react";
import {useRouter} from "next/navigation";

interface pageProps {
    phone: string
}
const DataViewPage: React.FC<pageProps> = ({ phone }: pageProps) => {

    const router = useRouter();
    // phone = router.query;

    return (
        <div>
            <h2>Phone: {phone}</h2>
        </div>
    )
}

export default DataViewPage;