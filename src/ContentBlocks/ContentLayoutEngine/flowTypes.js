/* @flow */

type ContentBlockType = {
  image: string,
  id: string,
  edit: boolean,
  card?: ?{},
  content: string,
  layout: Array<{
    value: string,
    name: string
  }>
}

type LayoutType = {
  name: string,
  value: string
};

export type LayoutProps = {
  children: Array<React$Element<any>>,
  layout: Array<LayoutType>,
  blocks: Array<ContentBlockType>
};
