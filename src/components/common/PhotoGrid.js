import React from "react";
import { Link } from "react-router-dom";

const PhotoGrid = ({ photos = [], error = "" }) => {
  return (
    <div className="photo-grid">
      {(!photos.length || error) && (
        <div className={`empty${error ? " error" : ""}`}>{error || "No photos found..."}</div>
      )}
      {photos.map((p) => (
        <div className="photo-grid-item" key={p.id}>
          <Link to={`/photos/${p.id}`}>
            <img src={p.thumbnailUrl} alt={p.title || "Photo"}></img>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
