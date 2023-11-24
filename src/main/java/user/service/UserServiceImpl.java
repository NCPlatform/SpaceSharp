package user.service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import jpa.bean.*;
import jpa.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;
import jpa.dao.BoardDAO;
import jpa.dao.HotelCategoryDAO;
import jpa.dao.HotelDAO;
import jpa.dao.RoomDAO;
import jpa.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private HotelDAO hotelDAO;
	
	@Autowired
	private BoardDAO boardDAO;
	
	@Autowired
	private RoomDAO roomDAO;
	
	@Autowired
	private HotelCategoryDAO hotelCategoryDAO;
	
	@Autowired
	private ReservationDAO reservationDAO;

	@Override
	public String accountWrite(UserDTO userDTO) {
				
		userDAO.save(userDTO);
		return "리턴 성공";
	}
		
	@Override
	public boolean existsByEmail(String email) {
		return userDAO.existsByEmail(email);
	}

	
	@Override
	public List<HotelCategoryDTO> getHotelCategoryList() {
		return hotelCategoryDAO.findAll();
	}

	@Override
	public List<HotelDTO> getHotelList(String seqHotelCategory) {
	    // ','로 구분된 값을 분리하여 리스트로 만듭니다.
	    List<String> categories = Arrays.asList(seqHotelCategory.split(" "));
	    // 각 카테고리에 대해 trim을 사용하여 앞뒤의 공백을 제거합니다.
	    categories = categories.stream().map(String::trim).collect(Collectors.toList());
	    if (categories.size() > 1) {
	        List<HotelDTO> list  = new ArrayList<HotelDTO>();
	        for(String str : categories){
	        	list.addAll(hotelDAO.findBySeqHotelCategoryContaining(str));
	        }
	        return list;
	    } else {
	        // ','가 없는 경우 또는 하나의 값이 비어있는 경우
	    	if(seqHotelCategory.length() == 1) {
	    		// 한자리 숫자라면
	    		seqHotelCategory = "0" + seqHotelCategory;
	    	}
	        return hotelDAO.findBySeqHotelCategoryContaining(seqHotelCategory);
	    }
	}
	@Override
	public Optional<UserDTO> login(UserDTO userDTO) {
		return userDAO.findById(userDTO.getEmail());
	}

	@Override
	public Optional<BoardDTO> getBoard(int seqRefSeqBoard) {
		return boardDAO.findById(seqRefSeqBoard);
	}

	@Override
	public String write(BoardDTO boardDTO) {
		boardDAO.save(boardDTO);
		
		return "";
	}

	
	@Override
	public Object update(BoardDTO boardDTO) {
		  try {
		        // save 메서드를 이용하여 데이터를 업데이트
		        boardDAO.save(boardDTO);
		        return "success";
		    } catch (Exception e) {
		        e.printStackTrace();
		        return "fail";
		    }
	}

	@Override
	public void delete(int seqBoard) {
		
		System.out.println(seqBoard);
		boardDAO.deleteById(seqBoard);
		
	}

	@Override
	public Optional<BoardDTO> getReply(int seqRefSeqBoard) {
		System.out.println(seqRefSeqBoard);
		return boardDAO.getBySeqRefSeqBoard(seqRefSeqBoard);
	}

	@Override
    public String getHotelName(int seqHotel) {
        return hotelDAO.findById(seqHotel)
                .map(hotelDTO -> hotelDTO.getName())
                .orElse(null);
    }

	@Override
	public String getMainKeyword(int seqHotel) {
		return hotelDAO.findById(seqHotel)
                .map(hotelDTO -> hotelDTO.getMainKeyword())
                .orElse(null);
	}

	@Override
	public String getSubscribe(int seqHotel) {
		return hotelDAO.findById(seqHotel)
                .map(hotelDTO -> hotelDTO.getSubscribe())
                .orElse(null);
	}

	@Override
	public String getTags(int seqHotel) {
	    return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getKeyword())
	            .orElse(null);
	}
	
	@Override
	public String getPlaceEx(int seqHotel) {
	    return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getPlaceEx())
	            .orElse(null);
	}

	@Override
	public String getWorkinghour(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getWorkinghour())
	            .orElse(null);
	}

	@Override
	public String getHoliday(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getHoliday())
	            .orElse(null);
	}

	@Override
	public String getImages(int seqHotel) {
	    return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getImg())
	            .orElse(null);
	}

	@Override
	public HotelDTO getHotelInfo(int seqHotel) {
	    return hotelDAO.findById(seqHotel).orElse(null);
	}

	@Override
	public String getAddr(int seqHotel) {
	    return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getAddr())
	            .orElse(null);
	}

	@Override
	public UserDTO getUserByEmail(String email) {
	    return userDAO.findById(email).orElse(null);
	}


	@Override
	public List<RoomDTO> getRoomListByHotel(int seqHotel) {
		return roomDAO.findBySeqHotel( seqHotel);
	}


	@Override
	public List<ReservationDTO> getReservationListByRoom(int seqRoom, Date startDate, Date endDate) {
		List<ReservationDTO> reservations =  reservationDAO.findReservationsByRoomAndDate(seqRoom,startDate, endDate);
		return  reservations;
	}

	@Override
	public String getFacilities(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getFacilities())
	            .orElse(null);
	}

	@Override
	public String getAlert(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getAlert())
	            .orElse(null);
	}

	@Override
	public Map<String, Object> mainPage() {
		
		List<HotelCategoryDTO> hotelCategoryList = hotelCategoryDAO.findAll();
		List<HotelDTO> hotelList = hotelDAO.findTop6ByOrderBySeqHotelDesc();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("categoryList", hotelCategoryList);
		map.put("hotelList", hotelList);
		return map;
	}

	@Override
	public String getRefund(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getRefund())
	            .orElse(null);
	}

	@Override
	public Page<BoardDTO> list (Pageable pageable, int seqRefSeqBoard) {
		return boardDAO.findBySeqRefSeqBoard(pageable,seqRefSeqBoard);
	}

	@Override
	public Map<String,Object> hotelReserve(int seqRoom) {
		
		StringBuffer sb = new StringBuffer("");
		
		RoomDTO room = roomDAO.findById(seqRoom).get();
		HotelDTO hotel = hotelDAO.findById(room.getSeqHotel()).get();
		
		List<String> categories = Arrays.asList(hotel.getSeqHotelCategory().split(",")).stream().map(String::trim).collect(Collectors.toList());
	    for(String category : categories) {
	    	sb.append(hotelCategoryDAO.findById(Integer.parseInt(category)).get().getName() + ",");
	    }
	    sb.setLength(sb.length()-1);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("room", room);
		map.put("hotel", hotel);
		map.put("owner", userDAO.findById(hotel.getOwnerEmail()));
		map.put("hotelCategory", sb.toString());
		
		return map;
	}
	
	
}
