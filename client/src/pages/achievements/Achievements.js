import AchievementCard from "./AchievementCard";

export default function Achievements() {
  return (
    <div className="achievements-page">
      <h1 className="achievements-header">Achievements</h1>
      <div className="achievement-section">
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
      </div>
    </div>
  );
}
