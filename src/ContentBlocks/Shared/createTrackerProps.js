// @flow

type InputArgs = {
  value: string,
  category: string,
  label: string,
  type: string,
  track: true,
}

export default function createTrackerProps(args: InputArgs) {
  const obj = {};
  Object.keys(args).forEach((key) => {
    obj[`data-analytics-${key}`] = args[key];
  });
  return obj;
}
