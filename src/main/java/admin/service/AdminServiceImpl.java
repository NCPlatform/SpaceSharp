package admin.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jpa.bean.CouponDTO;
import jpa.bean.UserDTO;
import jpa.dao.CouponDAO;
import jpa.dao.IssuedCouponDAO;
import jpa.dao.UserDAO;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	CouponDAO couponDAO;
	
	@Autowired
	IssuedCouponDAO issuedCouponDAO;

	@Override
	public Page<UserDTO> getUserList(Pageable pageable,String filterUser) {
		
		if(filterUser.equals("all")) {
			return userDAO.findAllByUsergradeLessThan(pageable,10);
		}else if(filterUser.equals("user")){
			return userDAO.findAllByUsergradeLessThan(pageable,6);
		}else if(filterUser.equals("manager")){
			return userDAO.findAllByUsergrade(pageable,6);
		}else {
			return null;
		}
	}

	@Override
	public Map<String, Object> getCouponList(Pageable pageable, String searchValue) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(searchValue != null) {
			map.put("couponList", couponDAO.findAll(pageable));
		}else {
			map.put("couponList", couponDAO.findAllByTitleContaining(pageable, searchValue));
		}
		
		map.put("issuedCouponList", issuedCouponDAO.findAll());
				
		return map;
	}

	@Override
	public void addCoupon(CouponDTO couponDTO) {
		couponDAO.save(couponDTO);
	}

}
