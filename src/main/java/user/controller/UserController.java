package user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import user.service.UserService;



@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserController {
	
	@Autowired
	private UserService userService;


	@GetMapping("/getHotelName")
    public String getHotelName(@RequestParam int seqHotel) {
        return userService.getHotelName(seqHotel);
    }
	
	@GetMapping("/getMainKeyword")
    public String getMainKeyword(@RequestParam int seqHotel) {
        return userService.getMainKeyword(seqHotel);
    }
	
	@GetMapping("/getSubscribe")
	public String getSubscribe(@RequestParam int seqHotel) {
		return userService.getSubscribe(seqHotel);
	}
	
	@GetMapping("/getTags")
	public String getTags(@RequestParam int seqHotel) {
	    return userService.getTags(seqHotel);
	}
	
	@GetMapping("/getPlaceEx")
	public String getPlaceEx(@RequestParam int seqHotel) {
	    return userService.getPlaceEx(seqHotel);
	}
	
	@GetMapping("/getWorkinghour")
	public String getWorkinghour(@RequestParam int seqHotel) {
	    return userService.getWorkinghour(seqHotel);
	}
	
	@GetMapping("/getHoliday")
	public String getHoliday(@RequestParam int seqHotel) {
	    return userService.getHoliday(seqHotel);
	}
	
	@GetMapping("/getImages")
	public String getImages(@RequestParam int seqHotel) {
	    return userService.getImages(seqHotel);
	}
	
	@GetMapping("/getHotelInfo")
	public HotelDTO getHotelInfo(@RequestParam int seqHotel) {
	    return userService.getHotelInfo(seqHotel);
	}
	
	@GetMapping("/getAddr")
	public String getAddr(@RequestParam int seqHotel) {
	    return userService.getAddr(seqHotel);
	}
	
	@PostMapping(value = "getHotelCategoryList")
	@ResponseBody
	public List<HotelCategoryDTO> getHotelCategoryList(){
		return userService.getHotelCategoryList();
	}
	
	@PostMapping(value = "getHotelList")
	@ResponseBody
	public List<HotelDTO> getHotelList(@ModelAttribute HotelDTO hotelDTO){
		System.out.println("서버 방문");
		System.out.println(hotelDTO.getSeqHotelCategory());
		return userService.getHotelList(hotelDTO.getSeqHotelCategory());
	}
	
	
}