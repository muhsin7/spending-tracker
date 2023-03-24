import { useToken } from "../../../authentication/useToken";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Level from "../../achievements/Level";
var md5 = require("md5");

function get_gravatar_image_url(
  email,
  size,
  default_image,
  allowed_rating,
  force_default
) {
  email = typeof email !== "undefined" ? email : "john.doe@example.com";
  size = size >= 1 && size <= 2048 ? size : 70;
  default_image = typeof default_image !== "undefined" ? default_image : "mm";
  allowed_rating = typeof allowed_rating !== "undefined" ? allowed_rating : "g";
  force_default = force_default === true ? "y" : "n";

  return (
    "https://secure.gravatar.com/avatar/" +
    md5(email.toLowerCase().trim()) +
    "?size=" +
    size +
    "&default=" +
    encodeURIComponent(default_image) +
    "&rating=" +
    allowed_rating +
    (force_default === "y" ? "&forcedefault=" + force_default : "")
  );
}

export default function AccountCard() {
  const [user, setUser] = useState({});
  const [token, setToken] = useToken();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

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

  return (
    <div className="dashboard-container account-card">
      <div className="account-info">
        <div className="account-pfp">
          <img src={get_gravatar_image_url(user.email)} alt="User gravatar" />
        </div>
        <div className="account-details">
          <h3>{user.name}</h3>
          <div>{user.email}</div>
        </div>
      </div>
      <Link to="/user/update">
        <div className="btn dashboard-edit-profile-details">
          Edit profile details
        </div>
      </Link>
      <Level />
      <span className="account-achievements-number">
        Achievements unlocked:{" "}
        {achievements.filter((achievement) => achievement.owned).length} /{" "}
        {achievements.length}
      </span>
    </div>
  );
}
