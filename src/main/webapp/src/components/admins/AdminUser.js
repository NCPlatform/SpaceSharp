import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";

const AdminUser = () => {
  const [page, setPage] = useState();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/getUserList")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="container mt-5 pt-3">
        <h1>USER</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">email</th>
              <th scope="col">nickname</th>
              <th scope="col">addr</th>
              <th scope="col">tel</th>
              <th scope="col">usergrade</th>
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
        </table>
      </div>
    </>
  );
};

export default AdminUser;
