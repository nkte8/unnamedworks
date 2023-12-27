import React from 'react';

interface Props {
    localstorage_id_key: string
}
export default function Userlabel({localstorage_id_key}:Props) {
    
    // 初期値の設定
    var load_user_name = ""
    if (typeof localStorage !== "undefined"){
        const value = localStorage.getItem(localstorage_id_key);
        if (value !== null) {
            load_user_name = value
        }
    }

    return (
        <span>
            {load_user_name}
        </span>
    );
};
