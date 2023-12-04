import React from "react";
import { Link } from "react-router-dom";

const GallaryBoardItems = ({ item, userName }) => {
  return (
    <Link
      to={`/boardDetail/${item.seqBoard}`}
      className="col mb-3 px-2 text-decoration-none text-dark"
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold">{item.title}</h5>
          <p className="p-0 m-0 text-secondary">{userName}</p>
          <p className="text-end">
            {new Date(item.releaseDate).toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GallaryBoardItems;
