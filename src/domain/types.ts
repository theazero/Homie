export type PersonId = "person1" | "person2";

export type TaskId =
  | "vacuum"
  | "dishes"
  | "laundry"
  | "cook"
  | "tidy"
  | "grocery"
  | "cleaning"
  | "trash"
  | "other";

export type Person = {
  id: PersonId;
  name: string;
};

export type Chore = {
  id: string;
  task: TaskId;
  taskLabel: string;
  time: number;
  person: PersonId;
  date: string;
};

export type HouseholdSummary = {
  totalMinutes: number;
  completedCount: number;
  difference: number;
  personMinutes: Record<PersonId, number>;
  personPercents: Record<PersonId, number>;
  comparisonText: string;
};

export type ChoreShapeLayout = {
  blockSize: number;
  left: string;
  top: string;
  topRem: number;
  radius: string;
  zIndex: number;
};
