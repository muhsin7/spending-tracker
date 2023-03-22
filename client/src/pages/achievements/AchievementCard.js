import Medal from "../../images/Medal.png";

export default function AchievementCard(props) {
  return (
    <div className="achievement-card">
      <div className="achievement-info">
        <span className="achievement-title">{props.achievement.title}</span>
        <span className="achievement-exp">{props.achievement.exp} EXP</span>
        <span className="achievement-date">{props.achievement.date ? new Date(props.achievement.date).toLocaleString() : ""}</span>
        <span className="achievement-description">{props.achievement.description}</span>
        <img
        className={props.achievement.owned ? "achievement-medal" : "achievement-disabled-medal"}
        src={Medal} />
      </div>
    </div>
  );
}
