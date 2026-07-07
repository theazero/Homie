import type { HouseholdSummary, Person } from "../domain/types";

type SummaryPanelProps = {
  people: Person[];
  summary: HouseholdSummary;
};

export function SummaryPanel({ people, summary }: SummaryPanelProps) {
  return (
    <section className="summary-grid" aria-label="Household summary">
      <article className="summary-card">
        <h2>Household Summary</h2>
        <dl>
          <div>
            <dt>Total minutes</dt>
            <dd>{summary.totalMinutes}</dd>
          </div>
          <div>
            <dt>Completed chores</dt>
            <dd>{summary.completedCount}</dd>
          </div>
          <div>
            <dt>Difference</dt>
            <dd>{summary.difference} min</dd>
          </div>
        </dl>
      </article>

      <article className="summary-card">
        <h2>Shared Workload</h2>
        <dl>
          <div>
            <dt>
              <span className="dot dot-a" />
              <span>{people[0].name}</span>
            </dt>
            <dd>{summary.personPercents.person1}%</dd>
          </div>
          <div>
            <dt>
              <span className="dot dot-b" />
              <span>{people[1].name}</span>
            </dt>
            <dd>{summary.personPercents.person2}%</dd>
          </div>
          <div>
            <dt>
              <span className="dot dot-c" />
              Shared goal
            </dt>
            <dd>Even</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
