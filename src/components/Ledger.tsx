import type { Chore, Person } from "../domain/types";
import { getPersonName } from "../domain/household";

type LedgerProps = {
  chores: Chore[];
  people: Person[];
  comparisonText: string;
};

export function Ledger({ chores, people, comparisonText }: LedgerProps) {
  return (
    <section className="ledger">
      <div className="ledger-header">
        <h2>Completed Chores</h2>
        <p id="comparison">{comparisonText}</p>
      </div>
      <ul id="taskList">
        {chores.map((chore) => (
          <li key={chore.id}>
            {chore.date}: {chore.taskLabel} ({chore.time} minutes) - {getPersonName(people, chore.person)}
          </li>
        ))}
      </ul>
    </section>
  );
}
