type HeaderProps = {
  weekNumber: number;
};

export function Header({ weekNumber }: HeaderProps) {
  return (
    <header className="statement-header">
      <div>
        <p className="eyebrow">For an equal household</p>
        <h1>HOMIE</h1>
      </div>
      <div className="statement-date">
        <span>Week</span>
        <strong>{weekNumber.toString().padStart(2, "0")}</strong>
      </div>
    </header>
  );
}
