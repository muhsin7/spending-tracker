import ExpBar from "./ExpBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";

export default function Level() {
  const [token, setToken] = useToken();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  const TOTAL_EXP = user.exp;
  const CURRENT_LEVEL = user.level;
  const EXP_REQUIRED_TO_LEVEL_UP = 100;
  const COMPLETED = TOTAL_EXP % EXP_REQUIRED_TO_LEVEL_UP;
  const EXP_BAR_COLOR = "#00b57f";

  return (
    <div className="level-page">
      <h1 className="level-text">Current Level: {CURRENT_LEVEL}</h1>
      <span className="level-total-exp">Total exp gained: {TOTAL_EXP}</span>
      <div className="level-progress-section">
        <span className="level-progress-text">Progress until next level: </span>
        <ExpBar bgcolor={EXP_BAR_COLOR} completed={COMPLETED} />
      </div>
    </div>
  );
}
