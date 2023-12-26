import React, { useState, useEffect } from 'react';

import './main.css';

interface Props {
    api_url: string;
    page_name: string;
    user_name: string | null;
}

export default function Favobutton({ api_url, page_name, user_name }: Props) {
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(false);
    const get_result = async () => fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: page_name,
                user: user_name,
                arg: "read",
            }
        )
    }
    ).then((response) => response.json()
    ).then((data) => { setCount(data.favcount) }
    ).catch(() => {
        console.log("error");
    })

    const post_result = async () => fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: page_name,
                user: user_name,
                arg: "push",
            }
        )

    }
    ).then((response) => response.json()
    ).then((data) => { setCount(data.favcount) }
    ).catch(() => {
        console.log("error");
    })

    useEffect(() => {
        // 非同期処理の場合は、関数を定義しそれを呼び出すような形式で記述すること
        get_result()
    }, [])

    const handleClick = () => {
        // setCount(count + 1);
        setActive(true);
        post_result();
    };

    return (
        <button className={`likeButton ${active ? "clicked" : ""}`} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 15">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;
            {count}
        </button>
    );
};