import React from 'react';
import AdminHeader from './AdminHeader';
import CouponList from './coupons/CouponList';
import CouponAdd from './coupons/CouponAdd';

const AdminCoupon = () => {
  return (
    <>
      <AdminHeader />
      <div className="mt-5 pt-3 container">
        <div className="row">
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <CouponList />
          </div>
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <CouponAdd />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoupon;
