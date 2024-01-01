import React, { useState, useEffect } from 'react';
import { favo_api, get_auth_local, rm_auth_local } from '@/utils/favoapi'

interface Props {
    api_url: string
    login_ref: string
}
export default function Userlabel({ api_url , login_ref }:Props) {
    const [username, setUsername] = useState<string | null>(null);

    let auth = get_auth_local()
    const checkUserByApi = async () => {
        if (auth.id !== null && auth.secret !== null){
            try {
                let r = await favo_api(api_url, null, auth.id, auth.secret, "auth")
                if (r.rc == 200){
                    setUsername(auth.id)
                } else {
                    rm_auth_local()
                }
            } catch (e) {
                rm_auth_local()
            } 
        }
    }

    useEffect(() => {
        checkUserByApi()
    }, [])

    return (
        <span>
            {
                username !== null &&
                <React.StrictMode>
                    Welcome <b>{username}!</b>
                </React.StrictMode>
            }
            {
                username === null &&
                <React.StrictMode>
                    <a href={login_ref}>未ログイン</a>
                </React.StrictMode>
            }
        </span>
        
    );
};
