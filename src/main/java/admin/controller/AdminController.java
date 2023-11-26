package admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import admin.service.AdminService;
import jpa.bean.UserDTO;

@CrossOrigin
@Controller
@RequestMapping(value = "admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("getUserList")
	@ResponseBody
	public Page<UserDTO> getUserList(@PageableDefault(page=0, size=10, sort="email", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String filterUser){
		System.out.println(pageable);
		return adminService.getUserList(pageable,filterUser);
	}
	
	
}
