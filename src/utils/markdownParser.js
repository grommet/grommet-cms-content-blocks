// @flow

type Markdown = string;
type ParseMarkdown = (markdown: ?Markdown) => Markdown;
const parseMarkdown: ParseMarkdown = (markdown) => {
  if (markdown && markdown !== '') {
    return markdown.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
  return '';
}

export default parseMarkdown;
