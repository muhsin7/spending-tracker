import ExpBar from "./ExpBar";

export default function Level() {
  const TOTAL_EXP = 880;
  const CURRENT_LEVEL = Math.floor(TOTAL_EXP / 100);
  const COMPLETED = TOTAL_EXP % 100;
  const EXP_BAR_COLOR = "#00b57f";

  return (
    <div className="level-page">
      <h1 className="level-text">Current Level: {CURRENT_LEVEL}</h1>
      <span className="level-total-exp">Total exp gained: {TOTAL_EXP}</span>
      <div className="level-progress-section">
        <span className="level-progress-text">Progress until next level: </span>
        <ExpBar bgcolor={EXP_BAR_COLOR} completed={COMPLETED} />
      </div>
    </div>
  );
}
