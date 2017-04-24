// @flow

type EventOption = {
  option: string,
  target: EventTarget,
}

// $FlowFixMe
export type OnChangeEvent = SyntheticInputEvent & EventOption;

export type Asset = {
  path: string,
}