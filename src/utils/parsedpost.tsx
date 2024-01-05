import parse from 'html-react-parser'
import { ImageDialog } from '@/utils/ImageDialog.tsx'

const replace = (node: any) => {
    if (node.name === 'img') {
        const url = new URL(node.attribs.src).pathname.split('/')
        const filename = url[url.length -1]
        return (
            <ImageDialog src={node.attribs.src + "?format=auto"} alt={filename} />
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