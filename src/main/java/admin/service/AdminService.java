package admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.CouponDTO;
import jpa.bean.UserDTO;

public interface AdminService {

	public Page<UserDTO> getUserList(Pageable pageable,String filterUser);

	public Map<String, Object> getCouponList(Pageable pageable, String searchValue);

	public void addCoupon(CouponDTO couponDTO);

	public Map<String, Object> getEventList(Pageable pageable, String searchKey);

}
