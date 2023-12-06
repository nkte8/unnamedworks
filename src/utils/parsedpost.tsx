import parse from 'html-react-parser'

const replace = (node:any) => {
  if (node.name === 'img') {
    return (
      <a data-lightbox="group" href={node.attribs.src}><img src={node.attribs.src}/></a>
    )
  }
}

interface Props {
    html: string;
}
export function Parsedpost({ html }:Props) {
  return (
    parse(html, { replace })
  );
}