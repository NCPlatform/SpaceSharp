package admin.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.UserDTO;

public interface AdminService {

	public Page<UserDTO> getUserList(Pageable pageable,String filterUser);

}
