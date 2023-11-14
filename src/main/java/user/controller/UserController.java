package user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
	
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
	
	@PostMapping(path = "writeReply")
	@ResponseBody
	public String reply(@ModelAttribute BoardDTO boardDTO) {
		int seqRefSeqBoard = boardDTO.getSeqRefSeqBoard();
		
		Optional<BoardDTO> parentBoardOptional = userService.getBoard(seqRefSeqBoard);
		if (parentBoardOptional.isPresent()) {
			userService.write(boardDTO);
			return "Reply added successfully!";
		} else {
			return "원글이 없습니다.";
		}
	}
	
}
