// @flow
export type OnChangeEvent = SyntheticInputEvent | {
  option: string,
}

export type Asset = {
  path: string,
}