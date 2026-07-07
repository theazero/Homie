import { getInitial } from "../domain/household";
import { getClusteredChoreShapeLayout, getMapHeight } from "../domain/workloadMap";
import type { Chore, Person, PersonId } from "../domain/types";
import type { CSSProperties } from "react";

type WorkloadMapProps = {
  people: Person[];
  chores: Chore[];
  namesAreSaved: boolean;
  personMinutes: Record<PersonId, number>;
};

export function WorkloadMap({ people, chores, namesAreSaved, personMinutes }: WorkloadMapProps) {
  return (
    <section className="allocation-panel" aria-label="Contribution visualization">
      {people.map((person, index) => {
        const personChores = chores.filter((chore) => chore.person === person.id);

        return (
          <div className="allocation-account" key={person.id}>
            <div className="allocation-account-header">
              <span className={`dot dot-${index === 0 ? "a" : "b"}`} />
              <h2>{person.name}</h2>
              <strong>{personMinutes[person.id]} min</strong>
            </div>
            <ChoreMap peopleAreSaved={namesAreSaved} person={person} chores={personChores} />
          </div>
        );
      })}
    </section>
  );
}

type ChoreMapProps = {
  peopleAreSaved: boolean;
  person: Person;
  chores: Chore[];
};

function ChoreMap({ peopleAreSaved, person, chores }: ChoreMapProps) {
  if (!peopleAreSaved) {
    return (
      <div className="allocation-stack is-empty">
        <EmptyAllocation initial="+" label="Add names to begin" />
      </div>
    );
  }

  if (!chores.length) {
    return (
      <div className="allocation-stack is-empty">
        <EmptyAllocation initial={getInitial(person.name)} label="Equal share" />
      </div>
    );
  }

  return (
    <div className="allocation-stack has-chores" style={{ "--map-height": `${getMapHeight(chores)}px` } as CSSProperties}>
      {chores.map((chore, index) => {
        const layout = getClusteredChoreShapeLayout(chores, index);

        return (
          <div
            key={chore.id}
            className={`chore-block ${chore.person} task-${chore.task}`}
            style={
              {
                "--block-size": `${layout.blockSize}px`,
                "--block-left": layout.left,
                "--block-top": layout.top,
                "--block-radius": layout.radius,
                "--block-z-index": layout.zIndex,
              } as CSSProperties
            }
          >
            <strong>{chore.taskLabel}</strong>
            <span>{chore.time} min</span>
          </div>
        );
      })}
    </div>
  );
}

type EmptyAllocationProps = {
  initial: string;
  label: string;
};

function EmptyAllocation({ initial, label }: EmptyAllocationProps) {
  return (
    <div className="empty-allocation">
      <span>{initial}</span>
      <p>{label}</p>
    </div>
  );
}
