import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users = [], error = "" }) => {
  return (
    <div className="card-list">
      {(!users.length || error) && (
        <div className={`empty${error ? " error" : ""}`}>{error || "No users found..."}</div>
      )}
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
