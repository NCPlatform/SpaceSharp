package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping(value="login")
	@ResponseBody
	public String login(@ModelAttribute UserDTO userDTO) {
		return userService.login(userDTO);
		
	}
	
	@PostMapping(value="write")
	@ResponseBody
	public String write(@ModelAttribute BoardDTO boardDTO) {
		return userService.write(boardDTO);
	}
	
	@PostMapping(value="list")
	@ResponseBody
	public String list(@ModelAttribute BoardDTO boardDTO) {
		return userService.list(boardDTO);
	}
}
