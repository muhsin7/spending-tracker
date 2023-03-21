import AchievementCard from "./AchievementCard";
import Level from "./Level";

export default function Achievements() {
  const ACHIEVEMENT_DUMMY = {
    title: "The best achievement of all time",
    description: "This may or may not be the best achievement of all time",
  };

  const ACHIEVEMENT_DUMMY2 = {
    title: "¯\\_(ツ)_/¯",
    description: "idk",
  };

  const ACHIEVEMENT_DUMMY3 = {
    title: "Sure, here's some dummy text:",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin nibh et enim bibendum, quis lobortis massa suscipit.`,
  };

  return (
    <div className="achievements-page">
      <Level />
      <h1 className="achievements-header">Achievements</h1>
      <div className="achievement-section">
        <AchievementCard isUnlocked={true} achievement={ACHIEVEMENT_DUMMY} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY2} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY3} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY3} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY2} />
        <AchievementCard isUnlocked={false} achievement={ACHIEVEMENT_DUMMY3} />
        <AchievementCard isUnlocked={true} achievement={ACHIEVEMENT_DUMMY2} />
      </div>
    </div>
  );
}
