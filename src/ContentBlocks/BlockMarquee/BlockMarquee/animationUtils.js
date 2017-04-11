// @flow

type AnimationState = {
  scale: number,
  opacity: number,
};
export default function calculateAnimationState(
  node: HTMLElement,
  endScale: number = 1.25,
  endOpacity: number = 0.2
): AnimationState {
  const { top } = node.getBoundingClientRect();
  const height = node.clientHeight;
  if (top > 0) {
    return {
      scale: 1,
      opacity: 1
    };
  }
  const diff = (height + top) / height; // 300 + -300 / 300 = 0
  const ratio = 1 - diff; // 1
  const xScale = 100 * (endScale - 1); // 25
  const xOpacity = -100 * (1 - endOpacity);
  const calculatedScale = (ratio * xScale + 100) / 100; // 1 * 25 + 100 / 100 = 1.25
  const scale = Math.min(Math.max(calculatedScale, 1), endScale);
  const calculatedOpacity = (ratio * xOpacity + 100) / 100;
  const opacity = Math.max(endOpacity, calculatedOpacity);
  return {
    scale,
    opacity
  };
}
