import ExpBar from "./ExpBar";

export default function Level() {
  const CURRENT_LEVEL = 8;
  const TOTAL_EXP = 880;

  return (
    <div className="level-page">
      <h1 className="level-text">Current Level: {CURRENT_LEVEL}</h1>
      <span className="level-total-exp">Total exp gained: {TOTAL_EXP}</span>
      <div className="level-progress-section">
        <span className="level-progress-text">Progress until next level: </span>
        <ExpBar bgcolor={"#00B57f"} completed={80} />
      </div>
    </div>
  );
}
