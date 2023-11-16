package admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;
import jpa.dao.UserDAO;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	UserDAO userDAO;

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

}
