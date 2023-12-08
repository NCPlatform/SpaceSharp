package user.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletResponse;
import jpa.bean.BoardDTO;
import jpa.bean.CommentDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.HotelSearchDTO;
import jpa.bean.LikedDTO;
import jpa.bean.ReceiptDTO;
import jpa.bean.ReservationDTO;
import jpa.bean.RoomDTO;
import jpa.bean.UserDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;


public interface UserService {

	public Optional<UserDTO> login(UserDTO userDTO);
	
	public String write(BoardDTO boardDTO);

	public Optional<BoardDTO> getBoard(int seqBoard);

	public Object update(BoardDTO boardDTO);

	public void delete(int seqBoard);

	public String accountWrite(UserDTO userDTO);
	
	boolean existsByEmail(String email);
	
	public void updateNickname(String email, String newNickname);
	
	public void updateTel(String email, String newTel);
	
	public void updatePassword(String email, String newPassword);
	
	
	
	public void updateIsNaver(String email, boolean isnaver);

	public void deleteUser(String name, String password);
    
	public String getHotelName(int seqHotel);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);
	
	public String getMainKeyword(int seqHotel);

	public Map<String,Object> list(Pageable pageable, int seqRefSeqBoard);

	public Optional<BoardDTO> getReply(int seqRefSeqBoard);
	
	public String getSubscribe(int seqHotel);
	
	public String getTags(int seqHotel);
	
	public String getPlaceEx(int seqHotel);

	public String getWorkinghour(int seqHotel);

	public String getHoliday(int seqHotel);

	public String getImages(int seqHotel);
	
	public HotelDTO getHotelInfo(int seqHotel);

	public String getAddr(int seqHotel);
	
	public UserDTO getUserByEmail(String email);

	public List<RoomDTO> getRoomListByHotel(int seqHotel);

	public List<ReservationDTO> getReservationListByRoom(int seqRoom, Date startDate, Date endDate);

	public String getFacilities(int seqHotel);

	public String getAlert(int seqHotel);

	public String getRefund(int seqHotel);
	
	public Map<String, Object> mainPage();
	
	public Map<String,Object> hotelReserve(int seqRoom);

	public Map<String, Object> setReviewTab(int seqHotel);

	public void writeHotelComment(CommentDTO commentDTO);

	public Map<String, Object> getHotelDetailCard(int seqHotel);

	public Map<String,Object> getHotelList();
	
	// mail
	public String createToken(String userEmail);
	
	public String decodeToken(String token) throws Exception;

	public List<HotelDTO> searchHotel(HotelSearchDTO hotelDTO);
	
	public Integer saveReservation(ReservationDTO reservationDTO);

	public String saveReceipt(ReceiptDTO receiptDTO);

	public Map<String, Object> getEventList();

	public Map<String, Object> getReservationList(Pageable pageable, String email);

	public Map<String, Object> getReviewList(Pageable pageable, String email);

	public Map<String, Object> getQnAList(Pageable pageable, String email);

	public Map<String, Object> getBoardList(Pageable pageable, String searchKey, int seqBoardCategory);

	public String isLiked(String email, int seqHotel);

	public void deleteLike(String email, int seqHotel);

	public void addLike(String email, int seqHotel);

	public List<HotelDTO> getLikedHotel(String email);

	public String getCoupon(String email, int seqCoupon);
	


}
