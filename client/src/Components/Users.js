import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => {
        console.log(response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div>
          <p>{user.id}</p>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
