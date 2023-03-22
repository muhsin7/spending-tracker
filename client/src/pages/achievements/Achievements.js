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
        console.log(res.data);
        setAchievements(res.data);
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
      <h1 className="achievements-header">Achievements</h1>
      <div className="achievement-section">{cards}</div>
    </div>
  );
}
