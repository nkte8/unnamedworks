import { buildinRemote } from './buildin_remote';

const html = `
    <html>
    <head prefix="og: https://ogp.me/ns#">
    <meta name="twitter:image" content="https://unnamedworks.assets.newt.so/v1/996b31a7-6337-426a-8576-ce2d808e4d47/2023-12-10_214436.png?width=1200&#38;extract=1,336,2731,1345">
    <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-KPGC2P8BQL"></script>
    </head>
    <body>
    <img src="https://unnamedworks.assets.newt.so/v1/996b31a7-6337-426a-8576-ce2d808e4d47/2023-12-10_214436.png?format=auto" alt="TopPage" class="mdimg"/>
    <div class="contents">
    <img src="https://unnamedworks.assets.newt.so/v1/996b31a7-6337-426a-8576-ce2d808e4d47/2023-12-10_214436.png?format=auto" alt="TopPage" class="mdpreview"/>
    </div>
    </body>`

const r_test1 = `
    <html>
    <head prefix="og: https://ogp.me/ns#">
    <meta name="twitter:image" content="https://unnamedworks.assets.newt.so/v1/996b31a7-6337-426a-8576-ce2d808e4d47/2023-12-10_214436.png?width=1200&#38;extract=1,336,2731,1345">
    <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-KPGC2P8BQL"></script>
    </head>
    <body>
    <img src="/2023-12-10_214436.webp" alt="TopPage" class="mdimg"/>
    <div class="contents">
    <img src="/2023-12-10_214436.webp" alt="TopPage" class="mdpreview"/>
    </div>
    </body>`

describe('buildinRemote test', () => {
    console.log(buildinRemote(html,"./", "webp"))

    test("test1", () => {
        expect(buildinRemote(html,"./", "webp")).toBe(r_test1)
    })
})