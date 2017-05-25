// @flow

type Direction = 'FORWARDS' | 'BACKWARDS';

export function getNextActiveSlide(
  carousel: any[],
  activeSlideIndex: number,
  direction: Direction,
): number {
  if (direction === 'FORWARDS' && activeSlideIndex !== carousel.length - 1) {
    return activeSlideIndex + 1;
  } else if (direction === 'BACKWARDS' && activeSlideIndex !== 0) {
    return activeSlideIndex - 1;
  }
  return activeSlideIndex;
}

function forwards(items: any[], index: number) {
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