// 1. `astro:content`からユーティリティをインポート
import { z, defineCollection } from 'astro:content';
// 2. コレクションを定義
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional(),
        pubDate: z.date(),
    }),
});
// 3. コレクションを登録するために、単一の`collections`オブジェクトをエクスポート
//    このキーは、"src/content"のコレクションのディレクトリ名と一致する必要があります。
export const collections = {
    'posts': blogCollection,
};