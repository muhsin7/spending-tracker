import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../authentication/useToken";
import axios from "axios";
import { useEffect, useState } from "react";
import PercentageBar from "../limits/PercentageBar";
import ExpBar from "../../achievements/ExpBar";
var md5 = require('md5');


function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default)
{
    email = typeof email !== 'undefined' ? email : 'john.doe@example.com';
    size = (size >= 1 && size <= 2048) ? size : 80;
    default_image = typeof default_image !== 'undefined' ? default_image : 'mm';
    allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g';
    force_default = force_default === true ? 'y' : 'n';
    
    return ("https://secure.gravatar.com/avatar/" + md5(email.toLowerCase().trim()) + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''));
}

export default function AccountCard() {
    const [user, setUser] = useState({});
    const [token, setToken] = useToken();
  
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
  

    return (
        <div className="dashboard-container account-card">
            <div className="account-info">
                <div className="account-pfp">
                    <img src={get_gravatar_image_url(user.email)} alt="User gravatar"/>
                </div>
                <div className="account-details">
                    <h2>{user.name}</h2>
                    <div>{user.email}</div>
                </div>
            </div>
            <ExpBar completed={30} bgcolor="#00B57F" />
        </div>
    )
}