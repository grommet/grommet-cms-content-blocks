// @flow

type Direction = 'FORWARDS' | 'BACKWARDS';

function forwards(items: any[], index: number) {
  console.log(`Called forwards with index: ${index} and: ${items.length - 1}`);
  if (index !== items.length - 1) {
    return [
      ...items.slice(0, index),
      items[index + 1],
      items[index],
      ...items.slice(index + 2),
    ];
  }
  return items;
}

function backwards(items: any[], index: number) {
  if (index > 0) {
    return [
      ...items.slice(0, index - 1),
      items[index],
      items[index - 1],
      ...items.slice(index + 1),
    ];
  }
  return items;
}

export default function swap(items: any[], index: number, direction: Direction) {
  if (direction === 'FORWARDS') {
    return forwards(items, index);
  } else if (direction === 'BACKWARDS') {
    return backwards(items, index);
  }
  return items;
}