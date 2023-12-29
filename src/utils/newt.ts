import { createClient } from 'newt-client-js';

const client = createClient({
    spaceUid: import.meta.env.NEWT_SPACE_UID,
    token: import.meta.env.NEWT_API_TOKEN,
    apiType: import.meta.env.NEWT_API_TYPE,
});

export const getAllPosts = async () => {
    const allPosts = client
        .getContents({
            appUid: import.meta.env.NEWT_POSTS_APP_UID,
            modelUid: import.meta.env.NEWT_POSTS_MODEL_UID,
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
};

export const getHighlights = async () => {
    const allPosts = client
        .getContents({
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

export function genOgpUrlquery(width: number, height: number, focus_bottom: boolean):string {
    // ogpカードは変換により開けなくなる可能性があるため、formatを行わない。
    var assert_api_function:string = "?width=1200"
    var ogp_width = width - 1
    var ogp_height = Math.floor(height / 2)
    var ogp_top = Math.floor(height / 8)
    if (Boolean(focus_bottom) == true){
        ogp_top = ogp_top * 3
    }
    assert_api_function += 
        "&extract=1," + ogp_top + "," + ogp_width  + "," + ogp_height 
    return assert_api_function
}

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export function genPostSlug(pubDate: string, hash: string):string{
    // let matchedParts = hash.match(/[a-zA-Z]/g); 
    return `${dayjs(pubDate).tz().format("YYYY-MM-DD")}_${hash.substr(-2)}`;
}