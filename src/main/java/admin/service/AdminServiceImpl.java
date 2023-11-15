package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.UserDTO;
import jpa.dao.UserDAO;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	UserDAO userDAO;

	@Override
	public List<UserDTO> getUserList() {
		return userDAO.findAll();
	}

}
