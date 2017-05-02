// @flow

// $FlowFixMe
export type OnChangeEvent = SyntheticInputEvent & {
  option: string,
  target: any,
}

export type Asset = {
  path: string,
}