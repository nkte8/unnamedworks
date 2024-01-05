import type { AstroIntegration } from 'astro';
import { writeFileSync, readFileSync } from 'fs';
import path from "node:path";
import { fileURLToPath } from 'url';

const downloadRemote = async (path: string, dist: string) => {
    const response = await fetch(path, {
        method: 'GET',
        headers: {}
    })
    const arrayBuffer = await (await response.blob()).arrayBuffer();
    writeFileSync(dist, Buffer.from(arrayBuffer));
}

export const buildinRemote = async (content: string, distdir: string, format: string) => {
    let result = ""
    const filter = new RegExp("(?<=<img src=\")https://.*\.(png|jpg|webp)\?format=auto", "ig")
    const filter_result = filter.exec(content)
    if (filter_result !== null) {
        const img_url = new URL(filter_result[0])
        const ref = "/" + path.parse(img_url.pathname).name + "." + format
        img_url.searchParams.set("format", format)

        await fetch(img_url.href, {
            method: 'GET',
            headers: {}
        }).then((respnse) =>{
            return respnse.blob()
        }).then((blob) => {
            return blob.arrayBuffer()
        }).then((buffer) => {
            writeFileSync(path.join(distdir, ref), Buffer.from(buffer));
        })

        // await downloadRemote(img_url.href, path.join(distdir, ref))
        result = content.replace(filter, ref)
    }
    return result
}

export default function Integration():AstroIntegration {
    return {
        name: 'buildinRemote',
        hooks: {
            'astro:build:done': async ({ dir, routes }) => {
                const outdir = fileURLToPath(dir);
                routes.filter((route) => {
                    return (
                        route.type === "page" &&
                        route.distURL !== undefined &&
                        path.parse(route.component).name === "index"
                    )
                }).forEach(async (value) => {
                    if (value.distURL !== undefined) {
                        let fileContent = readFileSync(
                            value.distURL.pathname, 'utf8');
                        let content = await buildinRemote(fileContent, outdir, "webp")
                        writeFileSync(
                            value.distURL.pathname, 
                            content, 'utf8')
                    }
                })
            }
        }
    }
}