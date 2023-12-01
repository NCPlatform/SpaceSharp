package user.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.RoomDTO;
import jpa.bean.UserDTO;
import jpa.dao.UserDAO;
import user.service.UserService;


@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	private UserDAO userDAO;


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
	
	@GetMapping("/getFacilities")
	public String getFacilities(@RequestParam int seqHotel) {
	    return userService.getFacilities(seqHotel);
	}
	
	@GetMapping("/getAlert")
	public String getAlert(@RequestParam int seqHotel) {
	    return userService.getAlert(seqHotel);
	}
	
	@GetMapping("/getRefund")
	public String getRefund(@RequestParam int seqHotel) {
	    return userService.getRefund(seqHotel);
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
	
	@GetMapping("/getUserByEmail")
	public UserDTO getUserByEmail(@RequestParam String email) {
	    return userService.getUserByEmail(email);
	}
	
	@GetMapping("/getRoom")
	public List<RoomDTO> getRoomListByHotel(@RequestParam int seqHotel){
		return userService.getRoomListByHotel(seqHotel);
	}

	@GetMapping("/getReservation")
	public  List<Integer> getReservationListByRoom(@RequestParam int seqRoom, @RequestParam Date date){
		return userService.getReservationListByRoom(seqRoom, date);
	}
	
	@GetMapping("/updateNaverStatus")
	public String updateNaverStatus(@RequestParam String userEmail) {
	    boolean updated = userService.updateUserNaverStatus(userEmail, true); // 여기에서 true 또는 false로 변경 가능
	    if (updated) {
	        return "네이버 성공";
	    }
	    return "네이버 실패";
	}
	
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
	
	@GetMapping(path = "userid")
	@ResponseBody
	public UserDTO userid(@RequestParam String email) {
		return userService.getUserByEmail(email);
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
		return userService.accountWrite(userDTO);
	}
	
	@PostMapping(value = "existsByEmail")
	@ResponseBody
	public boolean existsByEmail(@RequestParam String email) {

		boolean exists = userService.existsByEmail(email);
		return userService.existsByEmail(email);
	
    }
	
    @PostMapping("/updateNickname")
    public ResponseEntity<String> updateNickname(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String newNickname = data.get("newNickname");

        userService.updateNickname(email, newNickname);

        return ResponseEntity.ok("회원님의 닉네임이 수정되었습니다.");
    }
    
    @PostMapping("updateIsKakao")
    public ResponseEntity<String> updateIsKakao(
    		@RequestParam String email,
    		@RequestParam boolean iskakao) {
    	try {
    		userService.updateIsKakao(email, iskakao);
    		return ResponseEntity.ok("업데이트 성공");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패");
    	}
    }
    
    @PostMapping("updateIsNaver")
    public ResponseEntity<String> updateIsNaver(
    		@RequestParam String email,
    		@RequestParam boolean isnaver) {
    	try {
    		userService.updateIsNaver(email, isnaver);
    		return ResponseEntity.ok("업데이트 성공");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패");
    	}
    }
    
    
	@PostMapping(value = "mainPage")
	@ResponseBody
	public Map<String, Object> mainPage(){
		return userService.mainPage();
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
