import { createClient, type Contents } from 'newt-client-js';
import Data from "@/utils/model/postformat.json";
type Post = typeof Data;

import Highlight from "@/utils/model/highlightformat.json";
type Highlight = typeof Highlight;

const client = createClient({
    spaceUid: import.meta.env.NEWT_SPACE_UID,
    token: import.meta.env.NEWT_API_TOKEN,
    apiType: import.meta.env.NEWT_API_TYPE,
});

export const getAllPosts = async (tag: string | null = null): Promise<Contents<Post>> => {
    let param = {
        appUid: import.meta.env.NEWT_POSTS_APP_UID,
        modelUid: import.meta.env.NEWT_POSTS_MODEL_UID,
        query: {
            order: ['-pubDate'],
        }
    }
    if (tag !== null) {
        Object.assign(param.query, {
            tags: {
                match: tag,
            }
        })
    }
    const allPosts: Promise<Contents<Post>> = client
        .getContents(
            param
        )
        .then((content) => content)
        .catch((err) => {
            console.log(err);
            return err;
        });
    return allPosts;
};

export const getHighlight = async (): Promise<Highlight> => {
    const Post: Promise<Highlight> = client
        .getContents<Highlight>({
            appUid: import.meta.env.NEWT_HIGHLIGHTS_APP_UID,
            modelUid: import.meta.env.NEWT_HIGHLIGHTS_MODEL_UID,
            query: {
                order: ['-pubDate'],
            }
        })
        .then((content) => content.items[0])
        .catch((err) => {
            console.log(err);
            return err;
        });
    return Post;
}

export const getHighlights = async (): Promise<Contents<Highlight>> => {
    const allPosts: Promise<Contents<Highlight>> = client
        .getContents<Highlight>({
            appUid: import.meta.env.NEWT_HIGHLIGHTS_APP_UID,
            modelUid: import.meta.env.NEWT_HIGHLIGHTS_MODEL_UID,
            query: {
                order: ['-pubDate'],
            }
        })
        .then((content) => content)
        .catch((err) => {
            console.log(err);
            return err;
        });
    return allPosts;
}

export const genOgpUrlquery = (
    width: number | null,
    height: number | null,
    focus_bottom: boolean): string => {

    // 開発環境等、imageが設定されていない場合のエラー回避処理
    if (width === null || height === null) {
        return ""
    }
    // ogpカードは変換により開けなくなる可能性があるため、formatを行わない。
    let assert_api_function: string = "?width=1200"
    let ogp_width = width - 1
    let ogp_height = Math.floor(height / 2)
    let ogp_top = Math.floor(height / 8)
    if (Boolean(focus_bottom) == true) {
        ogp_top = ogp_top * 3
    }
    assert_api_function +=
        "&extract=1," + ogp_top + "," + ogp_width + "," + ogp_height
    return assert_api_function
}

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const genPostSlug = (
    content: Post): string => {
    // let matchedParts = hash.match(/[a-zA-Z]/g);
    const hash:string = content._id
    return `${dayjs(content.pubDate).tz().format("YYYY-MM-DD")}_${hash.slice(-2)}`;
}