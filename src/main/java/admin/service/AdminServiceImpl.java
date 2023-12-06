package admin.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jpa.bean.CouponDTO;
import jpa.bean.EventDTO;
import jpa.bean.UserDTO;
import jpa.dao.CouponDAO;
import jpa.dao.EventDAO;
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
	
	@Autowired
	EventDAO eventDAO;

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

	@Override
	public Map<String, Object> getEventList(Pageable pageable, String searchKey) {
		Map<String,Object> map = new HashMap<String, Object>();
		
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_YEAR, -1);
		
		if(searchKey.equals("all")) {
			map.put("eventList", eventDAO.findAll(pageable));
		}else if(searchKey.equals("Termination")) {
			map.put("eventList",eventDAO.findAllByFinishDateBefore(pageable, calendar.getTime()));
		}else if(searchKey.equals("onGoing")) {
			map.put("eventList",eventDAO.findAllByFinishDateAfter(pageable, new Date()));
		}else {
			map.put("eventList",null);
		}
		
		map.put("deadline",eventDAO.findAllByFinishDateBetween(calendar.getTime(), new Date()));
		map.put("couponList", couponDAO.findAll());
		
		return map;
	}

	@Override
	public void addEvent(EventDTO eventDTO) {
		eventDAO.save(eventDTO);
		
	}

}
