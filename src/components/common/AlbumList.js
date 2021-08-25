import React from "react";
import { Link } from "react-router-dom";

const AlbumList = ({ albums = [] }) => {
  return (
    <div className="card-list">
      {albums.map((a) => (
        <div className="card" key={a.id}>
          <Link to={`/albums/${a.id}`}>
            <h3>{a.title}</h3>
            <div className="card-footer">
              <span>See album &rarr;</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
