import Medal from "../../images/Medal.png";

export default function AchievementCard(props) {
  return (
    <div className="achievement-card">
      <div className="achievement-info">
        <span className="achievement-title">The best achievement of all time</span>
        <span className="achievement-description">This may or may not be the best achievement of all time</span>
        <img
        className={props.isUnlocked ? "achievement-medal" : "achievement-disabled-medal"}
        src={Medal} />
      </div>
    </div>
  );
}
