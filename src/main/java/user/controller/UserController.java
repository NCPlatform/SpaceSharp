package user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping(value="login")
	@ResponseBody
	public UserDTO login(@ModelAttribute UserDTO userDTO) {
		Optional<UserDTO> DTO = userService.login(userDTO);
		
		if(DTO.isPresent() && DTO.get().getPassword().equals(userDTO.getPassword())) {
			return DTO.get();
		}else {
			return null;
		}
	}
	
	@PostMapping(value="write")
	@ResponseBody
	public String write(@ModelAttribute BoardDTO boardDTO) {
		return userService.write(boardDTO);
	}
	
	@GetMapping(value="list")
	@ResponseBody
	public Page<BoardDTO> list(@PageableDefault(page=0, size=10, sort="seqBoard", direction = Sort.Direction.DESC) Pageable pageable) {
		int seqRefSeqBoard = 0;
		return userService.list(pageable, seqRefSeqBoard);
	}
	
	@GetMapping(path = "getBoard")
	@ResponseBody
	public Optional<BoardDTO> getBoard(@RequestParam int seqBoard){
	    System.out.println("출력 : " + userService.getBoard(seqBoard));
		return userService.getBoard(seqBoard);
	}
	
	@PutMapping(path = "update")
	@ResponseBody
	public void update(@ModelAttribute BoardDTO boardDTO) {
		userService.update(boardDTO);
	}
	
	@PostMapping(path = "delete")
	@ResponseBody
	public void delete(@ModelAttribute BoardDTO boardDTO) {
		userService.delete(boardDTO.getSeqBoard());
	}
	
	@PostMapping(value = "accountWrite")
	@ResponseBody
	public String accountWrite(@ModelAttribute UserDTO userDTO ){
		System.out.println(userDTO.getEmail());
		System.out.println("부트 찍힘");
		return userService.accountWrite(userDTO);
	}
		
	@PostMapping(value = "getHotelCategoryList")
	@ResponseBody
	public List<HotelCategoryDTO> getHotelCategoryList(){
		return userService.getHotelCategoryList();
	}
	
	@PostMapping(value = "getHotelList")
	@ResponseBody
	public List<HotelDTO> getHotelList(@ModelAttribute HotelDTO hotelDTO){
		return userService.getHotelList(hotelDTO.getSeqHotelCategory());
	}
	
	@PostMapping(path = "writeReply")
	@ResponseBody
	public String reply(@ModelAttribute BoardDTO boardDTO) {
		
		System.out.println("메소드 진입성공");
		System.out.println(boardDTO);
		
		int seqRefSeqBoard = boardDTO.getSeqRefSeqBoard();
		
		Optional<BoardDTO> parentBoardOptional = userService.getBoard(seqRefSeqBoard);
		if (parentBoardOptional.isPresent()) {
			
			userService.write(boardDTO);
			return "Reply added successfully!";
		} else {
			return "원글이 없습니다.";
		}
		
	}
	
	@GetMapping(path = "getReply")
	@ResponseBody
	public Optional<BoardDTO> getReply(@RequestParam int seqRefSeqBoard){
		
		return userService.getReply(seqRefSeqBoard);
	}
	
	@GetMapping(value="notice")
	public String goNotice() {
		
		return "redirect:http://127.0.0.1:3000/login";
	}
}
