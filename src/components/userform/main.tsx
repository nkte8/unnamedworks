import React, { useState, useEffect } from 'react';

import './main.css';
import { favo_api, get_auth_local, set_auth_local, rm_auth_local } from '@/utils/favoapi'

interface Props {
    api_url: string,
    arg: "auth" | "register",
}
export default function LoginUserBox({ api_url, arg }: Props) {

    const localstorage_val =  get_auth_local()
    const [userid, setUserid] = useState(localstorage_val.id);
    const [secret, setSecret] = useState(localstorage_val.secret);
    const [islogin, setLoginStatus] = useState(false);

    const [msg, setMsg] = useState<string | null>(null);

    const form_msg = arg == "auth" ? "ログイン" : "ユーザ登録"
    const button_msg = arg == "auth" ? "Login" : "Register"

    const userid_pattern = "^([a-zA-Z0-9]{4,10})$"
    const secret_pattern = "^([a-zA-Z0-9]{5,20})$"

    const onClickLogin = async () => {
        if (userid.match(userid_pattern) && secret.match(secret_pattern)) {
            try {
                let result = await favo_api(api_url, null, userid, secret, arg);
                switch (result.rc) {
                    case 200:
                        set_auth_local({ id: userid, secret: secret })
                        window.location.reload();
                        break;
                    case 401:
                        setMsg("ID/PWの組み合わせが誤っています。");
                        break;
                    case 409:
                        setMsg("すでに使用されているIDです。");
                        break;
                    case 500:
                        setMsg("不明なサーバーエラーが発生しました。");
                        break;
                }
            } catch (e) {
                setMsg("不明なサーバーエラーが発生しました。")
            }
        } else {
            setMsg("IDは4~10文字/PWは5~20文字の半角英数で指定してください")
        }
    }
    const onClickLogout = async () => {
        rm_auth_local();
        window.location.reload();
    }

    const checkUserByApi = async () => {
        if (userid !== null && secret !== null){
            try {
                let r = await favo_api(api_url, null, userid, secret, "auth")
                if (r.rc == 200){
                    setLoginStatus(true)
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') return
        onClickLogin()
    }

    return (
        <div className="user_form">
            {
                islogin !== true &&
                <React.StrictMode>
                    <div className="context">
                        {form_msg}
                    </div>
                    {msg !== null &&
                        <span className='context alert'>
                            {msg}
                        </span>
                    }
                    <div>
                        <label>ID:</label><input
                            type='text'
                            className='textbox'
                            pattern={userid_pattern}
                            value={userid}
                            onKeyDown={handleKeyDown}
                            onChange={(event) => setUserid(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>PW:</label><input
                            type='password'
                            className='textbox'
                            pattern={secret_pattern}
                            value={secret}
                            onKeyDown={handleKeyDown}
                            onChange={(event) => setSecret(event.target.value)}
                        />
                    </div>
                    {
                        arg == "register" &&
                        <div className="context">
                            IDは4~10文字/PWは5~20文字の半角英数が使えます。
                        </div>
                    }
                    <div>
                        <button className='submit' onClick={onClickLogin}>
                            {button_msg}
                        </button>
                    </div>
                </React.StrictMode>
            }
            {
                islogin === true &&
                <React.StrictMode>
                    <div className="context">
                        {userid}はログイン中です。
                    </div>
                    <div>
                        <button className='submit' onClick={onClickLogout}>
                            Logout
                        </button>
                    </div>
                </React.StrictMode>
            }
        </div>
    );
};
