import AchievementCard from "./AchievementCard";
import Level from "./Level";

export default function Achievements() {
  return (
    <div className="achievements-page">
      <Level />
      <h1 className="achievements-header">Achievements</h1>
      <div className="achievement-section">
        <AchievementCard isUnlocked={true} />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard />
        <AchievementCard isUnlocked={true} />
      </div>
    </div>
  );
}
