import AchievementCardProgress from "./AchievementCardProgress";

export default function AchievementCard() {
  return (
    <div className="achievement-card">
      <div className="achievement-info">
        <span>The best achievement of all time</span>
      </div>
      <AchievementCardProgress bgcolor={"#00B57f"} completed={80} />
    </div>
  );
}
