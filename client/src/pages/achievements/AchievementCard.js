import AchievementCardProgress from "./AchievementCardProgress";

export default function AchievementCard() {
  return (
    <div className="achievement-card">
      <div className="achievement-info">
        <span className="achievement-title">The best achievement of all time</span>
        <span className="achievement-description">This may or may not be the best achievement of all time</span>
      </div>
      <AchievementCardProgress bgcolor={"#00B57f"} completed={80} />
    </div>
  );
}
