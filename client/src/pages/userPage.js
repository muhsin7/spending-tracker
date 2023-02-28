import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../authentication/useToken";
import { useUser } from "../authentication/useUser";

export default function UserPage() {
  const [token, setToken] = useToken();
  const [user, setUser] = useState({});

  useEffect(() => {
    const response = axios.get('/api/user/profile', {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        console.log(res.data);
        setUser(res.data);
    });
  }, []);

  return (
    <>
      <form>
        <h1>Logged in User</h1>
      </form>
      <div>Name: {user.name}</div>
      <div>id: {user.id}</div>
      <div>email: {user.email}</div>
    </>
  );
}
