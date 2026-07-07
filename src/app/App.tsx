import { AddChoreForm } from "../components/AddChoreForm";
import { Header } from "../components/Header";
import { Ledger } from "../components/Ledger";
import { Modal } from "../components/Modal";
import { SummaryPanel } from "../components/SummaryPanel";
import { WorkloadMap } from "../components/WorkloadMap";
import { getWeekNumber } from "../domain/household";
import { useHomie } from "../hooks/useHomie";

export function App() {
  const { people, chores, namesAreSaved, summary, modal, saveNames, addChore, closeModal } = useHomie();

  return (
    <>
      <div className="background-layer" />
      <div className="container">
        <Header weekNumber={getWeekNumber(new Date())} />
        <SummaryPanel people={people} summary={summary} />
        <main className="statement-body">
          <WorkloadMap
            people={people}
            chores={chores}
            namesAreSaved={namesAreSaved}
            personMinutes={summary.personMinutes}
          />
          <AddChoreForm people={people} namesAreSaved={namesAreSaved} onSaveNames={saveNames} onAddChore={addChore} />
        </main>
        <Ledger chores={chores} people={people} comparisonText={summary.comparisonText} />
      </div>
      <Modal modal={modal} onClose={closeModal} />
    </>
  );
}
