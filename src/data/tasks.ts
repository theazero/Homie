import type { TaskId } from "../domain/types";

export type TaskDefinition = {
  id: TaskId;
  label: string;
};

export const TASKS: TaskDefinition[] = [
  { id: "vacuum", label: "Vacuum" },
  { id: "dishes", label: "Dishes" },
  { id: "laundry", label: "Laundry" },
  { id: "cook", label: "Cook" },
  { id: "tidy", label: "Tidy up" },
  { id: "grocery", label: "Grocery shop" },
  { id: "cleaning", label: "Dusting" },
  { id: "trash", label: "Throw trash" },
  { id: "other", label: "Other" },
];

export function getTaskLabel(taskId: TaskId) {
  return TASKS.find((task) => task.id === taskId)?.label ?? "Other";
}
