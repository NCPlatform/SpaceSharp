package user.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.mail.internet.ParseException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jpa.bean.BoardDTO;
import jpa.bean.CommentDTO;
import jpa.bean.CouponDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.HotelSearchDTO;
import jpa.bean.IssuedCouponDTO;
import jpa.bean.LikedDTO;
import jpa.bean.ReceiptDTO;
import jpa.bean.ReservationDTO;
import jpa.bean.RoomDTO;
import jpa.bean.UserDTO;
import jpa.dao.CouponDAO;
import jpa.dao.IssuedCouponDAO;
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
	
	@Autowired
    private IssuedCouponDAO issuedCouponDAO;
	@Autowired
    private CouponDAO couponDAO;
	
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
	
	@GetMapping("getReservationList")
	public  Map<String, Object> getReservationList(@PageableDefault(page=0, size=5, sort="seqReservation", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String email){
		return userService.getReservationList(pageable, email);
	}
	
	@GetMapping("getReviewList")
	public  Map<String, Object> getReviewList(@PageableDefault(page=0, size=5, sort="seqComment", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String email){
		return userService.getReviewList(pageable, email);
	}
	
	@GetMapping("getQnAList")
	public  Map<String, Object> getQnAList(@PageableDefault(page=0, size=5, sort="seqBoard", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String email){
		return userService.getQnAList(pageable, email);
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

	@GetMapping("/coupon")
    public List<CouponDTO> getAllCoupons() {
        return couponDAO.findAll();
    }

    @GetMapping("/issuedCoupon")
    public List<IssuedCouponDTO> getAllIssuedCoupons() {
        return issuedCouponDAO.findAll();
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
		return userService.getBoard(seqBoard);
	}
	
	@GetMapping(path = "getCoupon")
	@ResponseBody
	public String getCoupon(@RequestParam String email, @RequestParam int seqCoupon){
		return userService.getCoupon(email, seqCoupon);
	}
	
	@GetMapping(path = "getBoardList")
	@ResponseBody
	public Map<String,Object> getBoardList(@PageableDefault(page=0, size=10, sort="seqBoard", direction = Sort.Direction.DESC) Pageable pageable, String searchKey, int seqBoardCategory){
	    
		return userService.getBoardList(pageable, searchKey, seqBoardCategory);
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
	
	@GetMapping(value = "getLikedHotel")
	@ResponseBody
	public List<HotelDTO> getLikedHotel(@RequestParam String email){
		return userService.getLikedHotel(email);
	}
	
	@PostMapping(value = "searchHotel")
	@ResponseBody
	public List<HotelDTO> searchHotel(@RequestBody HotelSearchDTO hotelDTO){
		System.out.println(hotelDTO);

		return userService.searchHotel(hotelDTO);
	}
	@PostMapping(value = "searchHotelByLowPrice")
	@ResponseBody
	public List<HotelDTO> searchHotelByLowPrice(@RequestBody HotelSearchDTO hotelDTO){
		System.out.println(hotelDTO);

		return userService.searchHotelByLowPrice(hotelDTO);
	}
	@PostMapping(value = "searchHotelByHighPrice")
	@ResponseBody
	public List<HotelDTO> searchHotelByHighPrice(@RequestBody HotelSearchDTO hotelDTO){
		System.out.println(hotelDTO);

		return userService.searchHotelByHighPrice(hotelDTO);
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
	public Map<String,Object> setReviewTab(@RequestParam int seqHotel){
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
	
	@GetMapping(value="getEventList")
	public Map<String,Object> getEventList(){
		return userService.getEventList();
	}
	
	@GetMapping(value="isLiked")
	public String isLiked(@RequestParam String email,@RequestParam int seqHotel){
		return userService.isLiked(email, seqHotel);
	}
	
	@GetMapping(value="deleteLike")
	public void deleteLike(@RequestParam String email, int seqHotel){
		userService.deleteLike(email, seqHotel);
	}
	
	@GetMapping(value="addLike")
	public void addLike(@RequestParam String email, int seqHotel){
		userService.addLike(email, seqHotel);
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
	
	// =========================== MAIL SERVICE =====================
	
	@Autowired
	private JavaMailSender mailSender;
	
	@PostMapping(value = "sendEmail")
	@ResponseBody
	public void sendEmail(@RequestParam(required = false, defaultValue = "1") int emailType,
						@RequestParam String emailId, @RequestParam String emailDomain  
						) {
		
		System.out.println("requested sendEmail : "+emailId+"@"+emailDomain);
		// emailType => 링크로 연결하려면 1, 인증번호를 보내려면 2
		/**/
		String emailAddr = emailId+"@"+emailDomain;
		System.out.println(emailAddr+" and emailType: "+emailType);
		String subject = "";
		String content = "";
		String whenOops = "";
		
		switch(emailType) {
		 
		  case 1: {
			  String tokenURL = "";
			  subject = "[Space#] SpaceSharp에서 비밀번호 찾기를 요청하셨나요?";
			  content = "<!DOCTYPE HTML> <html> <head> <meta charset = \\\"UTF-8\\\"/> <style> #body, #caption{text-align: center; color:black;} #caption{font-size: 5em;} table{height: 390px; width: 530px;} #btn{margin-left: 175px; } #oops{font-size: 0.75em; text-align: center; margin-left: 160px; color: gray; } #oopsHref{text-decoration: none;} table{border: 15px solid #FFCC66;} #introduce{font-size: 0.5em; color: gray;} #textColor{ color: #F9A700; } .rowSpace{height: 10px;} </style> </head> <body> <div> <table> <tr height = '100px'> <td><div id = 'caption'><img src=' https://kr.object.ncloudstorage.com/spacesharpbucket/storage/room/b76e1cc6-bba9-4413-854f-d841c77cb88d' style='width: 200px; height: 200px;'></div></td> </tr> <tr> <td><div id = 'body'> 안녕하세요, SpaceSharp입니다! <br><div class = 'rowSpace'></div> 아래 <span id = 'textColor'>SpaceSharp 열기</span> 버튼을 누르시면 <br><div class = 'rowSpace'></div> 요청하신 이메일 인증이 완료됩니다. </div></td> </tr> <tr height = '100px'> <td><div id = 'btn'><a href = '";
			  tokenURL = "http://localhost:3000/user/authRequest/"+userService.createToken(emailAddr);
			  content += tokenURL;
			  content += "' target = '_blank'><img width = '150px' src ='https://kr.object.ncloudstorage.com/spacesharpbucket/storage/room/d191dc5e-eab3-43c5-9923-d88d3dbd0706'></a></div><a href = '";
			  content += whenOops;
			  content += "' id = 'oopsHref'> <span id = 'oops'>인증 링크는 꼭 5분 안에 클릭해 주세요!</span></a> <br> </td></tr> </table> </div> <span id = 'introduce'>Project Space#, 2023.</span> </body> </html>";
			 
			  break;
		  }
		  
		  case 2 : {
			  int verifNum = 0;
			  subject = "[Space#] SpaceSharp에서 인증번호를 보내드립니다.";
			  content = "<!DOCTYPE HTML> <html> <head> <meta charset = \"UTF-8\"/> <style> #body, #caption{text-align: center;} #caption{font-size: 5em;} table{height: 390px; width: 530px;} #btn{margin-left: 175px; } #oops{font-size: 0.75em; text-align: center; margin-left: 160px; color: gray; } #oopsHref{text-decoration: none;} table{border: 15px solid #86A3B8;} #introduce{font-size: 0.5em; color: gray;} #textColor{ color: #F55050; } .rowSpace{height: 10px;} #verifNums{font-size: 3.5em; color: #F55050} </style> </head> <body> <div> <table> <tr height = '100px'> <td><div id = 'caption'>SpaceSharp</div></td> </tr> <tr> <td><div id = 'body'> 안녕하세요, SpaceSharp입니다! <br><div class = 'rowSpace'></div> 아래 <span id = 'textColor'>인증번호</span>를 정확히 입력해 주세요! <br><div class = 'rowSpace'></div> 인증번호를 입력하시면 요청하신 인증이 완료됩니다. </div></td> </tr> <tr height = '100px'> <td><div id = 'btn'><span id = 'verifNums'>";
			  verifNum = 23628;
			  content += ""+verifNum;
			  content += "</span> </div><a href = '";
			  content += whenOops;
			  content += "' id = 'oopsHref'> <span id = 'oops'>Oops! 인증을 요청하지 않았어요</span></a> <br> </td></tr> </table> </div> <span id = 'introduce'>Project Space#, 2023.</span> </body> </html>";
			  break;
		  }
		  
		  default: {
			  System.out.println("emailType을 확인해 주세요.");
			  break;
		  } 
		  }
		
		String from = "Space# <no-reply@project.spaceSharp.com>";
		String to = "<"+emailAddr+">";
		
		 try 
	        {
	            MimeMessage mail = mailSender.createMimeMessage();
	            MimeMessageHelper mailHelper = new MimeMessageHelper(mail, true, "UTF-8");
	            mailHelper.setFrom(from);
	            mailHelper.setTo(to);
	            mailHelper.setSubject(subject);
	            mailHelper.setText(content, true);
	            
	            mailSender.send(mail);
	        } 
	        catch(Exception e) 
	        {
	            e.printStackTrace();
	        }
	        
	}
	
	@PostMapping(value = "emailAuth")
	@ResponseBody
	public String authEmail(@RequestParam String token, HttpServletRequest request, HttpServletResponse response) {
		// 토큰 해금
		System.out.println("인증 요청됨 : "+token);
		try {
			userService.decodeToken(token);}
		catch(ExpiredJwtException e) {
			return "E";
		}
		catch(Exception e) {
			e.printStackTrace();
			return "N";
		}
		return "Y";
	}
	
}
