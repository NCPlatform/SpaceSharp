package user.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
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
	
	public void updateIsKakao(String email, boolean isKakao);
	
	public void updateIsNaver(String email, boolean isnaver);
	

    
	public String getHotelName(int seqHotel);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);
	
	
	public String getMainKeyword(int seqHotel);

	public Page<BoardDTO> list(Pageable pageable, int seqRefSeqBoard);

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

	public List<Integer> getReservationListByRoom(int seqRoom, Date date);

	public String getFacilities(int seqHotel);

	public String getAlert(int seqHotel);

	public String getRefund(int seqHotel);
	
	public Map<String, Object> mainPage();
	
	public boolean updateUserNaverStatus(String userEmail, boolean isnaver);







}
