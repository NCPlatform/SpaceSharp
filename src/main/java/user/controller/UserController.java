package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import jpa.bean.UserDTO;
import jpa.dao.UserDAO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
    private UserDAO userDAO; 
	
	@PostMapping(value = "accountWrite")
	@ResponseBody
	public String accountWrite(@ModelAttribute UserDTO userDTO ){
		System.out.println(userDTO.getEmail());
		return userService.accountWrite(userDTO);
	}
	
	@PostMapping(value = "existsByEmail")
	@ResponseBody
	public boolean existsByEmail(@RequestParam String email) {

		boolean exists = userService.existsByEmail(email);

		return userService.existsByEmail(email);
	
    }
				
	@PostMapping(value = "getHotelCategoryList")
	@ResponseBody
	public List<HotelCategoryDTO> getHotelCategoryList(){
		return userService.getHotelCategoryList();
	}
	
	@PostMapping(value = "getHotelList")
	@ResponseBody
	public List<HotelDTO> getHotelList(@ModelAttribute HotelDTO hotelDTO){
		System.out.println(hotelDTO.getSeqHotelCategory());
		return userService.getHotelList(hotelDTO.getSeqHotelCategory());
	}
	
	@GetMapping(value="notice")
	public String goNotice() {
		
		return "redirect:http://127.0.0.1:3000/login";
	}
	
	
	
}
