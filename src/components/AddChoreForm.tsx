import { useState } from "react";
import { TASKS } from "../data/tasks";
import type { Person, PersonId, TaskId } from "../domain/types";
import { CustomSelect } from "./CustomSelect";

type AddChoreFormProps = {
  people: Person[];
  namesAreSaved: boolean;
  onSaveNames: (person1Name: string, person2Name: string) => void;
  onAddChore: (task: TaskId, time: number, person: PersonId) => boolean;
};

export function AddChoreForm({ people, namesAreSaved, onSaveNames, onAddChore }: AddChoreFormProps) {
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [task, setTask] = useState<TaskId>("vacuum");
  const [time, setTime] = useState("");
  const [person, setPerson] = useState<PersonId>("person1");

  const personOptions = people.map((householdPerson) => ({
    value: householdPerson.id,
    label: householdPerson.name,
  }));

  return (
    <section className="action-panel">
      <h2>Add Chore</h2>

      <div className={`name-grid${namesAreSaved ? " is-complete" : ""}`}>
        <p className="form-note">
          {namesAreSaved ? `${people[0].name} and ${people[1].name}` : "Start by naming the household members. Chores unlock after this step."}
        </p>
        {!namesAreSaved && (
          <>
            <label htmlFor="person1">Person 1</label>
            <input id="person1" type="text" placeholder="Enter name" value={person1Name} onChange={(event) => setPerson1Name(event.target.value)} />
            <label htmlFor="person2">Person 2</label>
            <input id="person2" type="text" placeholder="Enter name" value={person2Name} onChange={(event) => setPerson2Name(event.target.value)} />
            <button type="button" onClick={() => onSaveNames(person1Name, person2Name)}>
              Save names
            </button>
          </>
        )}
      </div>

      <div className={`chore-grid${namesAreSaved ? " is-unlocked" : " is-locked"}`} aria-hidden={!namesAreSaved}>
        <p className="form-note chore-note">Household names saved. Now log each chore as it happens.</p>
        <label htmlFor="taskSelect">Chore</label>
        <CustomSelect id="taskSelect" value={task} options={TASKS.map(({ id, label }) => ({ value: id, label }))} onChange={setTask} />

        <label htmlFor="taskTime">Minutes</label>
        <input id="taskTime" type="number" placeholder="Time" value={time} onChange={(event) => setTime(event.target.value)} />

        <label htmlFor="personSelect">Assigned to</label>
        <CustomSelect id="personSelect" value={person} options={personOptions} onChange={setPerson} />

        <button
          type="button"
          onClick={() => {
            if (onAddChore(task, Number.parseInt(time, 10), person)) {
              setTime("");
            }
          }}
        >
          Add chore
        </button>
      </div>
    </section>
  );
}
