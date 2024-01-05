import { useState, useEffect } from 'react';

import './main.css';
import { favo_api, get_auth_local } from '@/utils/favoapi'

interface Props {
    api_url: string,
    page_name: string,
}
export default function Favobutton({ api_url, page_name }: Props) {

    const auth = get_auth_local()

    const [count, setCount] = useState(0);
    const [active, setActive] = useState(false);

    const runFavoApi = async (arg: "read" | "push") => {
        try {
            let c = await favo_api(api_url, page_name, auth.id, auth.secret, arg)
            if (c.favcount !== null) {
                setCount(c.favcount)
            }
            return (c.favcount !== null)
        } catch (e) {
            return false
        }
    }

    useEffect(() => {
        runFavoApi("read")
    }, [])

    const handleClick = async () => {
        if (await runFavoApi("push")) {
            setActive(true);
        }
    };

    return (
        <button className={`favobutton ${active ? "clicked" : ""}`} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 15">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;
            {count}
        </button>
    );
};