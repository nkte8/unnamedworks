import React, { useState, useEffect } from 'react';

interface Props {
    api_url: string,
    localstorage_id_key: string
}
export default function Favolabel({api_url, localstorage_id_key}:Props) {
    
    // 初期値の設定
    var load_user_name: string | null = null
    if (typeof localStorage !== "undefined"){
        const value = localStorage.getItem(localstorage_id_key);
        if (value !== null) {
            load_user_name = value
        }
    }
    const [count, setCount] = useState(null);

    useEffect(() => {
        fetch(api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    user: load_user_name,
                    arg: "read",
                }
            )
        }
        ).then((response) => response.json()
        ).then((data) => { setCount(data.favcount) }
        ).catch(() => {
            console.log("error");
        })
    }, [])

    return (
        <span>
            {count}
        </span>
    );
};
