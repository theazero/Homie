import type { Chore, HouseholdSummary, Person, PersonId } from "./types";

export const DEFAULT_PEOPLE: Person[] = [
  { id: "person1", name: "Person 1" },
  { id: "person2", name: "Person 2" },
];

export function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function getWeekNumber(date: Date) {
  const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));

  return Math.ceil((((currentDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getPersonName(people: Person[], personId: PersonId) {
  return people.find((person) => person.id === personId)?.name ?? personId;
}

export function getHouseholdSummary(people: Person[], chores: Chore[]): HouseholdSummary {
  const personMinutes = chores.reduce<Record<PersonId, number>>(
    (totals, chore) => ({
      ...totals,
      [chore.person]: totals[chore.person] + chore.time,
    }),
    { person1: 0, person2: 0 },
  );
  const totalMinutes = personMinutes.person1 + personMinutes.person2;
  const person1Percent = totalMinutes ? Math.round((personMinutes.person1 / totalMinutes) * 100) : 50;
  const personPercents = {
    person1: person1Percent,
    person2: totalMinutes ? 100 - person1Percent : 50,
  };
  const difference = Math.abs(personMinutes.person1 - personMinutes.person2);
  const person1Name = getPersonName(people, "person1");
  const person2Name = getPersonName(people, "person2");

  let comparisonText = "Both have contributed equally in terms of time!";

  if (personMinutes.person1 > personMinutes.person2) {
    comparisonText = `${person2Name} needs to add ${difference} more minutes to match ${person1Name}.`;
  } else if (personMinutes.person2 > personMinutes.person1) {
    comparisonText = `${person1Name} needs to add ${difference} more minutes to match ${person2Name}.`;
  }

  return {
    totalMinutes,
    completedCount: chores.length,
    difference,
    personMinutes,
    personPercents,
    comparisonText,
  };
}
