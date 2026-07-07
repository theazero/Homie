import { describe, expect, it } from "vitest";
import { DEFAULT_PEOPLE, getHouseholdSummary } from "../household";
import type { Chore } from "../types";

describe("getHouseholdSummary", () => {
  it("starts with an even split when there are no chores", () => {
    const summary = getHouseholdSummary(DEFAULT_PEOPLE, []);

    expect(summary.totalMinutes).toBe(0);
    expect(summary.completedCount).toBe(0);
    expect(summary.difference).toBe(0);
    expect(summary.personPercents).toEqual({ person1: 50, person2: 50 });
  });

  it("calculates contribution totals and difference", () => {
    const chores: Chore[] = [
      {
        id: "1",
        task: "vacuum",
        taskLabel: "Vacuum",
        time: 40,
        person: "person1",
        date: "2026-07-07",
      },
      {
        id: "2",
        task: "cook",
        taskLabel: "Cook",
        time: 20,
        person: "person2",
        date: "2026-07-07",
      },
    ];

    const summary = getHouseholdSummary(DEFAULT_PEOPLE, chores);

    expect(summary.totalMinutes).toBe(60);
    expect(summary.completedCount).toBe(2);
    expect(summary.difference).toBe(20);
    expect(summary.personMinutes).toEqual({ person1: 40, person2: 20 });
    expect(summary.personPercents).toEqual({ person1: 67, person2: 33 });
  });
});
