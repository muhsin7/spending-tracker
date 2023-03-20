import { FaMedal } from "react-icons/fa";

export default function AchievementCard() {
  return (
    <div className="achievement-card">
      <div className="achievement-info">
        <span className="achievement-title">The best achievement of all time</span>
        <span className="achievement-description">This may or may not be the best achievement of all time</span>
        <FaMedal />
      </div>
    </div>
  );
}
