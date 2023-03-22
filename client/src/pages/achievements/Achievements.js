import AchievementCard from "./AchievementCard";
import AchievementsSortBy from "./AchievementsSortBy";
import AchievementsFilterBy from "./AchievementsFilterBy";
import Level from "./Level";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";

export default function Achievements() {
  const [token, setToken] = useToken();
  const [achievements, setAchievements] = useState([]);
  const [defaultAchievements, setDefaultAchievements] = useState([]);

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
        setDefaultAchievements(res.data);
      });
  }, []);

  const cards = [];
  achievements.forEach((e) => {
    cards.push(
      <AchievementCard achievement={e} key={e.title} />
    );
  });

  return (
    <div className="achievements-page">
      <Level />
      <div className="achievements-top">
        <h1 className="achievements-header">Achievements</h1>
        <span className="achievements-sort-filter">
            <AchievementsSortBy
              achievements={achievements}
              setAchievements={setAchievements}
              defaultAchievements={defaultAchievements}
              setDefaultAchievements={setDefaultAchievements}
              token={token}
            />
            <AchievementsFilterBy
              achievements={achievements}
              defaultAchievements={defaultAchievements}
              setAchievements={setAchievements}
              token={token}
            />
          </span>
        </div>
      <div className="achievement-section">{cards}</div>
    </div>
  );
}
