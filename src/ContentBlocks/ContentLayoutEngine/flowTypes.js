/* @flow */

export type LayoutType = {
  name: string,
  value: string
}

export type ContentBlockType = {
  image: string,
  id: string,
  edit: boolean,
  card?: ?{},
  content: string,
  layout: LayoutType
}

export type LayoutProps = {
  children: Array<React$Element<any>>,
  layout: Array<LayoutType>,
  blocks: Array<ContentBlockType>,
  applyLayout: boolean
}
