import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import CouponList from './coupons/CouponList';
import CouponAdd from './coupons/CouponAdd';
import '../../css/CouponList.css';

import axios from 'axios';

const AdminCoupon = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('seqCoupon');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [searchValue, setSearchValue] = useState();

  const [couponList, setCouponList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [issuedCouponList, setIssuedCouponList] = useState();

  useEffect(() => {
    axios
      .get(`/admin/getCouponList?page=${page}&size=${size}&sort=${sort},${sortDirection}&searchValue=${searchValue}`)
      .then(res => {
        setCouponList(res.data.couponList.content);
        setTotalPages(res.data.couponList.totalPages);
        setIssuedCouponList(res.data.issuedCouponList);
      })
      .catch(err => console.log(err));
  }, [page, sort, sortDirection, searchValue]);

  return (
    <>
      <AdminHeader />
      <div className="container py-3 rounded bg-secondary-subtle" style={{ marginTop: '5rem' }}>
        <div className="row h-100">
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 my-3">
            {couponList && (
              <CouponList
                couponList={couponList}
                totalPages={totalPages}
                issuedCouponList={issuedCouponList}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 my-3">
            <CouponAdd />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoupon;
