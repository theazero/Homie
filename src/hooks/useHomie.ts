import { useMemo, useState } from "react";
import { getTaskLabel } from "../data/tasks";
import { DEFAULT_PEOPLE, getHouseholdSummary } from "../domain/household";
import type { Chore, Person, PersonId, TaskId } from "../domain/types";
import type { ModalState } from "../components/Modal";

export function useHomie() {
  const [people, setPeople] = useState<Person[]>(DEFAULT_PEOPLE);
  const [chores, setChores] = useState<Chore[]>([]);
  const [namesAreSaved, setNamesAreSaved] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  const summary = useMemo(() => getHouseholdSummary(people, chores), [people, chores]);

  function saveNames(person1Name: string, person2Name: string) {
    setPeople([
      { id: "person1", name: person1Name.trim() || "Person 1" },
      { id: "person2", name: person2Name.trim() || "Person 2" },
    ]);
    setNamesAreSaved(true);
  }

  function addChore(task: TaskId, time: number, person: PersonId) {
    if (!namesAreSaved) {
      setModal({
        title: "One thing first",
        message: "Save the household names before adding chores.",
      });
      return false;
    }

    if (!Number.isFinite(time) || time < 1) {
      setModal({
        title: "Missing minutes",
        message: "Add how many minutes this chore took before logging it.",
      });
      return false;
    }

    setChores((currentChores) => [
      ...currentChores,
      {
        id: crypto.randomUUID(),
        task,
        taskLabel: getTaskLabel(task),
        time,
        person,
        date: new Date().toLocaleDateString(),
      },
    ]);

    return true;
  }

  return {
    people,
    chores,
    namesAreSaved,
    summary,
    modal,
    saveNames,
    addChore,
    closeModal: () => setModal(null),
  };
}
