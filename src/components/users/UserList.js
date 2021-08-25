import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users = [] }) => {
  return (
    <div className="card-list">
      {users.map((u) => (
        <div className="card" key={u.id}>
          <Link to={`/users/${u.id}`}>
            <h3>{u.name}</h3>
            <p>{u.username}</p>
            <div className="card-footer">
              <span>See user &rarr;</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
