import AchievementCard from "./AchievementCard";
import Level from "./Level";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";

export default function Achievements() {
  const [token, setToken] = useToken();
  const [achievements, setAchievements] = useState([]);

  // Gets all the user's achievements from the database
  useEffect(() => {
    axios
      .get("/api/achievement", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAchievements(res.data);
      });
  }, []);

  const ACHIEVEMENT_DUMMY = {
    title: "The best achievement of all time",
    description: "This may or may not be the best achievement of all time",
    isUnlocked: true,
  };

  const ACHIEVEMENT_DUMMY2 = {
    title: "¯\\_(ツ)_/¯",
    description: "idk",
    isUnlocked: false,
  };

  const ACHIEVEMENT_DUMMY3 = {
    title: "Sure, here's some dummy text:",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin nibh et enim bibendum, quis lobortis massa suscipit.`,
    isUnlocked: false,
  };

  const ACHIEVEMENTS = [
    ACHIEVEMENT_DUMMY,
    ACHIEVEMENT_DUMMY2,
    ACHIEVEMENT_DUMMY3,
  ];

  const cards = [];
  ACHIEVEMENTS.forEach((e) => {
    cards.push(
      <AchievementCard isUnlocked={e.isUnlocked} achievement={e} key={e._id} />
    );
  });

  return (
    <div className="achievements-page">
      <Level />
      <h1 className="achievements-header">Achievements</h1>
      <div className="achievement-section">{cards}</div>
    </div>
  );
}
