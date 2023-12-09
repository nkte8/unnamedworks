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

export const getLatestHighlight = async () => {
    const allPosts = client
    .getContents({
        appUid: import.meta.env.NEWT_HIGHLIGHTS_APP_UID,
        modelUid: import.meta.env.NEWT_HIGHLIGHTS_MODEL_UID,
        query: {
            limit: 1,
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