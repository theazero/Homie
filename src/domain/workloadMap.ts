import type { Chore, ChoreShapeLayout } from "./types";

const MAP_PATTERN = [
  { left: "4%", topRem: 1, radius: "999px" },
  { left: "40%", topRem: 0.75, radius: "47% / 40%" },
  { left: "7%", topRem: 15, radius: "42% / 34%" },
  { left: "48%", topRem: 15.5, radius: "999px" },
  { left: "24%", topRem: 25, radius: "46% / 38%" },
  { left: "54%", topRem: 24, radius: "999px" },
];

const MAP_HEIGHT = 560;

export function getChoreBlockSize(minutes: number) {
  return Math.min(215, Math.max(118, 96 + minutes * 1.9));
}

export function getChoreShapeLayout(index: number, minutes: number, clusterIndex = 0): ChoreShapeLayout {
  const position = MAP_PATTERN[index % MAP_PATTERN.length];
  const clusterStep = clusterIndex % 5;
  const horizontalOffset = clusterStep * 2.4;
  const verticalOffset = clusterStep * 2.15;
  const topRem = position.topRem + verticalOffset;

  return {
    blockSize: getChoreBlockSize(minutes),
    left: `calc(${position.left} + ${horizontalOffset}rem)`,
    top: `${topRem}rem`,
    topRem,
    radius: position.radius,
    zIndex: clusterIndex + 1,
  };
}

export function getClusteredChoreShapeLayout(chores: Chore[], index: number): ChoreShapeLayout {
  const chore = chores[index];
  const taskOrder = Array.from(new Set(chores.map((item) => item.task)));
  const taskIndex = taskOrder.indexOf(chore.task);
  const clusterIndex = chores.slice(0, index).filter((item) => item.task === chore.task).length;

  return getChoreShapeLayout(taskIndex, chore.time, clusterIndex);
}

export function getMapHeight(_chores: Chore[]) {
  return MAP_HEIGHT;
}
