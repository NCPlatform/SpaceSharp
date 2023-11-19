import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";

const AdminUser = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("nickname");
  const [sortDirection, setSortDirection] = useState("DESC");

  const [filterUser, setFilterUser] = useState("all");

  const [totalPages, setTotalPages] = useState();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/admin/getUserList?page=${page}&size=${size}&sort=${sort},${sortDirection}&filterUser=${filterUser}`
      )
      .then((res) => {
        setUserList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [page, size, sort, filterUser, sortDirection]);

  return (
    <>
      <AdminHeader />
      <div className="container mt-5 pt-3">
        <h1>USER</h1>
        <div className="d-flex justify-content-end">
          <div>
            <h4>필터링</h4>
            <div>
              <input
                type="radio"
                className="btn-check"
                name="userFilter"
                id="filterAll"
                autoComplete="off"
                onClick={() => setFilterUser("all")}
                defaultChecked
              />
              <label className="btn btn-secondary" htmlFor="filterAll">
                ALL
              </label>

              <input
                type="radio"
                className="btn-check"
                name="userFilter"
                id="filterUser"
                autoComplete="off"
                onClick={() => setFilterUser("user")}
              />
              <label className="btn btn-secondary" htmlFor="filterUser">
                USER
              </label>

              <input
                type="radio"
                className="btn-check"
                name="userFilter"
                id="filterManager"
                autoComplete="off"
                onClick={() => setFilterUser("manager")}
              />
              <label className="btn btn-secondary" htmlFor="filterManager">
                MANAGER
              </label>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() =>
                  sort !== "email"
                    ? setSort("email")
                    : sortDirection === "ASC"
                    ? setSortDirection("DESC")
                    : setSortDirection("ASC")
                }
              >
                email
                {sortDirection === "ASC" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
              </th>
              <th
                scope="col"
                onClick={() =>
                  sort !== "nickname"
                    ? setSort("nickname")
                    : sortDirection === "ASC"
                    ? setSortDirection("DESC")
                    : setSortDirection("ASC")
                }
              >
                nickname
                {sortDirection === "ASC" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
              </th>
              <th
                scope="col"
                onClick={() =>
                  sort !== "addr"
                    ? setSort("addr")
                    : sortDirection === "ASC"
                    ? setSortDirection("DESC")
                    : setSortDirection("ASC")
                }
              >
                addr
                {sortDirection === "ASC" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
              </th>
              <th
                scope="col"
                onClick={() =>
                  sort !== "tel"
                    ? setSort("tel")
                    : sortDirection === "ASC"
                    ? setSortDirection("DESC")
                    : setSortDirection("ASC")
                }
              >
                tel
                {sortDirection === "ASC" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
              </th>
              <th
                scope="col"
                onClick={() =>
                  sort !== "usergrade"
                    ? setSort("usergrade")
                    : sortDirection === "ASC"
                    ? setSortDirection("DESC")
                    : setSortDirection("ASC")
                }
              >
                usergrade
                {sortDirection === "ASC" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.nickname}</td>
                <td>{item.addr}</td>
                <td>{item.tel}</td>
                <td>
                  {item.usergrade === 10 ? (
                    <>최고관리자</>
                  ) : item.usergrade > 5 ? (
                    <>사장님</>
                  ) : (
                    <>일반유저</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} align="center">
                {Array.from({ length: totalPages }).map((item, idx) => (
                  <button
                    key={idx}
                    className="btn btn-dark"
                    onClick={() => setPage(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AdminUser;
