import parse from 'html-react-parser'
import { ImageDialog } from '@/utils/ImageDialog.tsx'

const replace = (node: any) => {
    if (node.name === 'img') {
        return (
            <ImageDialog src={node.attribs.src + "?format=auto"} />
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