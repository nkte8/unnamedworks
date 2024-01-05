import parse from 'html-react-parser'
import { ImageDialog } from '@/utils/ImageDialog.tsx'

const replace = (node: any) => {
    if (node.name === 'img') {
        let alt = ""
        if (typeof node.attribs.alt !== "undefined") {
            alt = node.attribs.alt
        } else {
            const url = new URL(node.attribs.src).pathname.split('/')
            alt = url[url.length -1]
        }
        return (
            <ImageDialog src={node.attribs.src + "?format=auto"} alt={alt} />
        )
    }
}

interface Props {
    html: string;
}
export function Parsedpost({ html }: Props) {
    return (
        parse(html, { replace })
    );
}