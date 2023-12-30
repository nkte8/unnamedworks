// APIからのリスポンスを定義
type ApiResponse = {
    rc: number;
    favcount: number | null;
    msg: string | null;
}

export const favo_api = async (
    api_url: string,
    id: string | null,
    userid: string | null,
    secret: string | null,
    arg: "read" | "auth" | "register" | "push",
): Promise<ApiResponse> =>
    fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: id,
                user: userid,
                secret: secret,
                arg: arg,
            })
    }
    ).then((response) => response.json()
    ).catch(() => {
        console.log("error");
    })


// localstorage関連  
interface LocalStorageInfo {
    id: string;
    secret: string;
}

const localstorage_id_key_name = "user_name"
const localstorage_secret_key_name = "secret"

export const get_auth_local = ():LocalStorageInfo => {
    var load_user_name: string = ""
    var load_user_secret: string = ""
    if (typeof localStorage !== "undefined") {
        let __uid = localStorage.getItem(localstorage_id_key_name);
        let __sec = localStorage.getItem(localstorage_secret_key_name);
        load_user_name = __uid !== null ? __uid : ""
        load_user_secret = __sec !== null && __uid !== "" ? __sec : ""
    }
    return {
        id: load_user_name,
        secret: load_user_secret
    }
}

export const set_auth_local = ({id, secret}:LocalStorageInfo): boolean => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(localstorage_id_key_name, id);
        localStorage.setItem(localstorage_secret_key_name, secret);
        return true
    }
    return false
}

export const rm_auth_local = (): boolean => {
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(localstorage_id_key_name);
        localStorage.removeItem(localstorage_secret_key_name);
        return true
    }
    return false
}