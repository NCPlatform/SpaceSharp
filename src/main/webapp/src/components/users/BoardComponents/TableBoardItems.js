import React from "react";
import { Link } from "react-router-dom";

const TableBoardItems = ({ item, userName }) => {
  return (
    <tr>
      <td className="text-center">{item.seqBoard}</td>
      <td>
        <Link
          to={`/boardDetail/${item.seqBoard}`}
          className="text-truncate text-decoration-none text-dark"
        >
          {item.title}
        </Link>
      </td>
      <td className="text-center">{userName}</td>
      <td className="text-center d-none d-lg-block d-xl-block d-xxl-block">
        {new Date(item.releaseDate).toLocaleDateString("ko-KR")}
      </td>
    </tr>
  );
};

export default TableBoardItems;
