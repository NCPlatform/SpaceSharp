package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping(value = "accountWrite")
	@ResponseBody
	public String accountWrite(@ModelAttribute UserDTO userDTO ){
		System.out.println(userDTO.getEmail());
		System.out.println("부트 찍힘");
		return userService.accountWrite(userDTO);
		
	}
	
}
