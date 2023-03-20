import AchievementCard from "./AchievementCard";
import Level from "./Level";

export default function Achievements() {
  return (
    <div className="achievements-page">
      <Level />
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
