import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";

const AdminUser = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("email");

  const [filterUser, setFilterUser] = useState("all");

  const [totalPages, setTotalPages] = useState();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`/admin/getUserList?page=${page}&size=${size}&sort=${sort}&filterUser=${filterUser}`)
      .then((res) => {
        setUserList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [page,size,sort,filterUser]);

  return (
    <>
      <AdminHeader />
      <div className="container mt-5 pt-3">
        <h1>USER</h1>
        <div className="d-flex justify-content-end">
          <div>
            <h4>필터링</h4>
            <div>
              <input type="radio" className="btn-check" name="userFilter" id="filterAll" autoComplete="off" onClick={()=>setFilterUser("all")} defaultChecked/>
              <label className="btn btn-secondary" htmlFor="filterAll">ALL</label>

              <input type="radio" className="btn-check" name="userFilter" id="filterUser" autoComplete="off" onClick={()=>setFilterUser("user")}/>
              <label className="btn btn-secondary" htmlFor="filterUser">USER</label>

              <input type="radio" className="btn-check" name="userFilter" id="filterManager" autoComplete="off" onClick={()=>setFilterUser("manager")}/>
              <label className="btn btn-secondary" htmlFor="filterManager">MANAGER</label>
            </div>
          </div>
          <div>
          <h4>정렬</h4>
            <div>
              <input type="radio" className="btn-check" name="userFilter" id="filterAll" autoComplete="off" onClick={()=>setFilterUser("all")} defaultChecked/>
              <label className="btn btn-secondary" htmlFor="filterAll">ALL</label>

              <input type="radio" className="btn-check" name="userFilter" id="filterUser" autoComplete="off" onClick={()=>setFilterUser("user")}/>
              <label className="btn btn-secondary" htmlFor="filterUser">USER</label>

              <input type="radio" className="btn-check" name="userFilter" id="filterManager" autoComplete="off" onClick={()=>setFilterUser("manager")}/>
              <label className="btn btn-secondary" htmlFor="filterManager">MANAGER</label>
            </div>
          </div>
        </div>
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
          <tfoot>
            <tr>
              <td colSpan={5} align="center">
                {
                  Array.from({length: totalPages}).map((item,idx)=>(
                    <button key={idx} className="btn btn-dark" onClick={()=>setPage(idx)}>{idx+1}</button>
                  ))
                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AdminUser;
