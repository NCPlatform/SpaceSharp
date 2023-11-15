package admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import admin.service.AdminService;

@CrossOrigin
@Controller
@RequestMapping(value = "admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	
	
}
