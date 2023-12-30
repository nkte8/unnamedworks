import React, { useState, useEffect } from 'react';

import { favo_api, get_auth_local } from '@/utils/favoapi'

interface Props {
    api_url: string,
}

export default function Favolabel({ api_url }: Props) {
    const auth = get_auth_local()

    const [label, setLabel] = useState("now loading...")
    useEffect(() => {
        setCountFromApi()
    }, [])

    const setCountFromApi = async () => {
        try { 
            let c = await favo_api(api_url, null, auth.id, auth.secret, "read")
            if (c.favcount !== null) {
                let thx = c.favcount > 0 ? "ありがとうございます！" : "これからよろしくね。"
                setLabel(`${auth.id}さんは${c.favcount}回いいねしました。${thx}`)
            }else{
                setLabel("ログイン中の場合、ここに情報が表示されます。")
            }
        } catch (e) {
            setLabel("ログイン中の場合、ここに情報が表示されます。")
        }
    }

    return (
        <span>
            {label}
        </span>
    );
};
