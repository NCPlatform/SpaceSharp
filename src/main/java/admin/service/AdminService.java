package admin.service;

import java.util.List;

import jpa.bean.UserDTO;

public interface AdminService {

	public List<UserDTO> getUserList();

}
