package user.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.internet.ParseException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jpa.bean.BoardDTO;
import jpa.bean.CommentDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.HotelSearchDTO;
import jpa.bean.ReceiptDTO;
import jpa.bean.ReservationDTO;
import jpa.bean.RoomDTO;
import jpa.bean.UserDTO;
import jpa.dao.ReceiptDAO;
import jpa.dao.ReservationDAO;
import jpa.dao.UserDAO;
import manager.service.ObjectStorageService;
import user.service.UserService;


@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private ObjectStorageService ncpService;
	@Autowired
	private ReservationDAO reservationDAO;
	@Autowired
	private ReceiptDAO receiptDAO;
	
	private String bucketName = "spacesharpbucket";


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
	
	@GetMapping("getRoom")
	public List<RoomDTO> getRoomListByHotel(@RequestParam int seqHotel){
		return userService.getRoomListByHotel(seqHotel);
	}

	@GetMapping("getReservation")
	public  List<ReservationDTO> getReservationListByRoom(@RequestParam int seqRoom, @RequestParam Date startDate, @RequestParam Date endDate){
		return userService.getReservationListByRoom(seqRoom, startDate, endDate);
	}
	@PostMapping("/reservation")
	  public ResponseEntity<String> saveReservation(@RequestBody ReservationDTO reservationDTO) {
	    try {
	      

	      reservationDAO.save(reservationDTO);
	      
	      int seqReservation = reservationDAO.findTopByOrderBySeqReservationDesc().get().getSeqReservation();
	      
	      // 성공적으로 처리되었을 경우
	      return new ResponseEntity<>(String.valueOf(seqReservation), HttpStatus.OK);
	    } catch (Exception e) {
	      // 처리 중 오류가 발생한 경우
	      return new ResponseEntity<>("예약 저장에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @PostMapping("/receipt")
	  public ResponseEntity<String> saveReceipt(@RequestBody ReceiptDTO receiptDTO) {
	    try {
	      
	      int seqReservation = receiptDTO.getSeqReservation();

	      receiptDAO.save(receiptDTO);

	      // 성공적으로 처리되었을 경우
	      return new ResponseEntity<>("영수증이 성공적으로 저장되었습니다. seqReservation: " + seqReservation, HttpStatus.OK);
	    } catch (Exception e) {
	      // 처리 중 오류가 발생한 경우
	      return new ResponseEntity<>("영수증 저장에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
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
	public Map<String,Object> list(@PageableDefault(page=0, size=10, sort="seqBoard", direction = Sort.Direction.DESC) Pageable pageable) {
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
	
	
	@PostMapping("/existsByIsKakao")
    public ResponseEntity<Boolean> existsByIsKakao(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/updateNickname")
    public ResponseEntity<String> updateNickname(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String newNickname = data.get("newNickname");

        userService.updateNickname(email, newNickname);

        return ResponseEntity.ok("회원님의 닉네임이 수정되었습니다.");
    }

    @PostMapping("/updateTel")
    public ResponseEntity<String> updateTel(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String newTel = data.get("newTel");

        userService.updateTel(email, newTel);

        return ResponseEntity.ok("회원님의 닉네임이 수정되었습니다.");
    }
       
    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String newPassword = data.get("newPassword");

        userService.updatePassword(email, newPassword);

        return ResponseEntity.ok("회원님의 비밀번호가 수정되었습니다.");
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
    
    @PostMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody Map<String, String> deleteUserData) {
        try {
            userService.deleteUser(deleteUserData.get("name"), deleteUserData.get("password"));
            return new ResponseEntity<>("회원 삭제가 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("회원 삭제에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
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
	@PostMapping(value = "searchHotel")
	@ResponseBody
	public List<HotelDTO> searchHotel(@RequestBody HotelSearchDTO hotelDTO){
		System.out.println(hotelDTO);

		return userService.searchHotel(hotelDTO);
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
	
	@GetMapping(value="hotelReserve")
	public Map<String,Object> hotelReserve(int seqRoom) {
		return userService.hotelReserve(seqRoom);
	}
	
	@GetMapping(value="setReviewTab")
	public Map<String,Object> setReviewTab(int seqHotel){
		return userService.setReviewTab(seqHotel);
	}
	
	@PostMapping(value="writeHotelComment")
	@ResponseBody
	public void  writeHotelComment (@RequestPart CommentDTO commentDTO, @RequestPart(required = false) List<MultipartFile> list, HttpSession session) {
		
		if(list != null) {
			String imgValue = uploadObject(list, "comment");
			commentDTO.setPicture(imgValue);
		}
		
		userService.writeHotelComment(commentDTO);
		
	}
	
	@GetMapping(value="getHotelDetailCard")
	public Map<String,Object> getHotelDetailCard(int seqHotel){
		return userService.getHotelDetailCard(seqHotel);
	}
	
	@GetMapping(value="getHotelList")
	public Map<String,Object> getHotelList(){
		return userService.getHotelList();
	}
	
	public String uploadObject(List<MultipartFile> list, String path) {
		String fileName;
		ArrayList<String> fileNames = new ArrayList<>();
		
		for(MultipartFile img : list) {
				fileName = "https://kr.object.ncloudstorage.com/spacesharpbucket/storage/"+path+"/";
				fileName += ncpService.uploadFile(bucketName, "storage/"+path+"/", img);
				fileNames.add(fileName);
			}
		String imgValue = "";
		
		for(String img : fileNames) {
			if(imgValue.equals("")) {
				imgValue += img;
			}else {
				imgValue +=", "+img;
			}
		}
		return imgValue;
	}
	
}
