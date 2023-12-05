import { createClient } from 'newt-client-js';

const client = createClient({
    spaceUid: import.meta.env.NEWT_SPACE_UID,
    token: import.meta.env.NEWT_CDN_API_TOKEN,
    apiType: 'cdn',
});

export const getAllPosts = async () => {
    const allPosts = client
        .getContents({
            appUid: import.meta.env.NEWT_APP_UID,
            modelUid: import.meta.env.NEWT_MODEL_UID,
        })
        .then((content) => content)
        .catch((err) => {
            console.log(err);
            return err;
        });
    return allPosts;
};


