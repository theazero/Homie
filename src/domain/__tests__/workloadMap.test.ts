import { describe, expect, it } from "vitest";
import { getChoreShapeLayout, getClusteredChoreShapeLayout, getMapHeight } from "../workloadMap";
import type { Chore } from "../types";

describe("workload map layout", () => {
  it("creates deterministic shape placement", () => {
    const first = getChoreShapeLayout(0, 40);
    const second = getChoreShapeLayout(1, 40);

    expect(first.left).toBe("calc(4% + 0rem)");
    expect(first.top).toBe("1rem");
    expect(second.left).toBe("calc(40% + 0rem)");
    expect(second.radius).toBe("47% / 40%");
  });

  it("clusters repeated chores by task without growing the map", () => {
    const chores: Chore[] = Array.from({ length: 7 }, (_, index) => ({
      id: `${index}`,
      task: "vacuum",
      taskLabel: "Vacuum",
      time: 60,
      person: "person1",
      date: "2026-07-07",
    }));
    const first = getClusteredChoreShapeLayout(chores, 0);
    const second = getClusteredChoreShapeLayout(chores, 1);

    expect(first.left).toBe("calc(4% + 0rem)");
    expect(second.left).toBe("calc(4% + 2.4rem)");
    expect(second.zIndex).toBeGreaterThan(first.zIndex);
    expect(getMapHeight(chores)).toBe(560);
  });
});
