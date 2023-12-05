package user.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;

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
import jpa.dao.BoardDAO;
import jpa.dao.CommentDAO;
import jpa.dao.HotelCategoryDAO;
import jpa.dao.HotelDAO;
import jpa.dao.LikedDAO;
import jpa.dao.ReceiptDAO;
import jpa.dao.ReservationDAO;
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
	
	@Autowired
	private ReceiptDAO receiptDAO;
	
	@Autowired
	private CommentDAO commentDAO;
	
	@Autowired
	private LikedDAO likedDAO;
	

	@Override
	public String accountWrite(UserDTO userDTO) {
				
		userDAO.save(userDTO);
		return "리턴 성공";
	}
	
	@Override
	public boolean existsByEmail(String email) {
		return userDAO.existsByEmail(email);
	}

	public void updateNickname(String email, String newNickname) {
		UserDTO userDTO = userDAO.findByEmail(email);
		if (userDTO != null) {
			userDTO.setNickname(newNickname);
			userDAO.save(userDTO);
		}
	}
	
	@Override
	public void updateTel(String email, String newTel) {
		UserDTO userDTO = userDAO.findByEmail(email);
		if (userDTO != null) {
			userDTO.setTel(newTel);
			userDAO.save(userDTO);
		}
		
	}
	
	@Override
	public void updatePassword(String email, String newPassword) {
		UserDTO userDTO = userDAO.findByEmail(email);
		if (userDTO != null) {
			userDTO.setPassword(newPassword);
			userDAO.save(userDTO);
		}
		
	}
	
	@Override
	public void updateIsNaver(String email, boolean isnaver) {
        UserDTO userDTO = userDAO.findByEmail(email);
                
        userDTO.setIsnaver(isnaver);
        userDAO.save(userDTO);
    }
	
	@Override
	public void deleteUser(String name, String password) {
		UserDTO userDTO = userDAO.findByNameAndPassword(name, password);
		
		if (userDTO != null) {
			userDAO.delete(userDTO);
		} else {
			throw new RuntimeException("사용자를 찾을 수 없습니다.");
		}
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
	public Map<String,Object> getHotelList() {
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		map.put("hotelList", hotelDAO.findAll());
		
	    return map;
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
		return roomDAO.findBySeqHotel(seqHotel);
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
		List<CommentDTO> reviewList = commentDAO.findTop6ByOrderBySeqCommentDesc();
		List<Object> reviewCardList = new ArrayList<Object>();
		Map<String, Object> reviewCard = new HashMap<String, Object>();
		
		for(CommentDTO dto : reviewList) {
			reviewCard = new HashMap<String, Object>();
			StringBuffer sb = new StringBuffer("");
			
			ReservationDTO reservDTO = reservationDAO.getBySeqReservation(dto.getSeqReservation()).get();
			RoomDTO roomDTO = roomDAO.findById(reservDTO.getSeqRoom()).get();
			HotelDTO hotelDTO = hotelDAO.findById(roomDTO.getSeqHotel()).get();
			
			List<String> categories = Arrays.asList(hotelDTO.getSeqHotelCategory().split(",")).stream().map(String::trim).collect(Collectors.toList());
		    for(String category : categories) {
		    	sb.append(hotelCategoryDAO.findById(Integer.parseInt(category)).get().getName() + ",");
		    }
		    sb.setLength(sb.length()-1);

			reviewCard.put("reviewItem", dto);
			reviewCard.put("reservedRoom", roomDTO);
			reviewCard.put("reservedHotel", hotelDTO);
			reviewCard.put("hotelCategory", sb.toString());
			
			reviewCardList.add(reviewCard);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("categoryList", hotelCategoryList);
		map.put("hotelList", hotelList);
		map.put("reviewCardList", reviewCardList);
		return map;
	}

	@Override
	public String getRefund(int seqHotel) {
		return hotelDAO.findById(seqHotel)
	            .map(hotelDTO -> hotelDTO.getRefund())
	            .orElse(null);
	}

	@Override
	public Map<String,Object> list (Pageable pageable, int seqRefSeqBoard) {
		Map<String,Object> map = new HashMap<String,Object>();
		Page<BoardDTO> boardList = boardDAO.findBySeqRefSeqBoard(pageable,seqRefSeqBoard);
		map.put("boardList",boardList);
		map.put("userList", userDAO.findAll());
		return map;
	}

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

	@Override
	public Map<String, Object> setReviewTab(int seqHotel) {
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		List<RoomDTO> list = roomDAO.findBySeqHotel(seqHotel);
		List<ReservationDTO> reservationList = new ArrayList<ReservationDTO>();
		List<CommentDTO> commentList = new ArrayList<CommentDTO>();
		List<UserDTO> userList = new ArrayList<UserDTO>();
		
		Optional<UserDTO> user = null;
		
		for(RoomDTO dto : list) {
			reservationList.addAll(reservationDAO.findAllBySeqRoom(dto.getSeqRoom()));
		}
		
		for(ReservationDTO dto : reservationList) {
			commentList.addAll(commentDAO.findAllBySeqReservation(dto.getSeqReservation()));
			user = userDAO.findById(dto.getEmail());
			if(user.isPresent()) {
				userList.add(user.get());
			}
		}
		
		System.out.println(userList);
		
		map.put("reservation", reservationList);
		map.put("reserveUser", userList);
		map.put("review", commentList);
		
		return map;
	}

	@Override
	public void writeHotelComment(CommentDTO commentDTO) {
		commentDAO.save(commentDTO);
		
	}

	@Override
	public Map<String, Object> getHotelDetailCard(int seqHotel) {
		Map<String,Object> map = new HashMap<String,Object>();
		int maxPeople = Integer.MIN_VALUE;
		int temp1 = 0;
		int minPrice = Integer.MAX_VALUE;
		
		List<RoomDTO> roomList = roomDAO.findBySeqHotel(seqHotel);
		List<ReservationDTO> reservationList = new ArrayList<ReservationDTO>();
		List<CommentDTO> commentList = new ArrayList<CommentDTO>();
		List<LikedDTO> likedList = likedDAO.findAllBySeqHotel(seqHotel);
		
		for(RoomDTO dto : roomList) {
			temp1 = Integer.parseInt(dto.getPeople().split(" ~ ")[1].substring(3, dto.getPeople().split(" ~ ")[1].length()-1));
			if(maxPeople < temp1) maxPeople = temp1;
			if(minPrice > dto.getPrice()) minPrice = dto.getPrice();
			reservationList.addAll(reservationDAO.findAllBySeqRoom(dto.getSeqRoom()));
		}
		
		if(maxPeople == Integer.MIN_VALUE) maxPeople = -1;
		if(minPrice == Integer.MAX_VALUE) minPrice = -1;
		
		for(ReservationDTO dto : reservationList) {
			commentList.addAll(commentDAO.findAllBySeqReservation(dto.getSeqReservation()));
		}
		
		map.put("maxPeople", maxPeople);
		map.put("minPrice", minPrice);
		map.put("cntReview", commentList.size());
		map.put("cntLike", likedList.size());
		return map;		
	}

	@Override
	public List<HotelDTO> searchHotel(HotelSearchDTO hotelDTO) {
		return hotelDAO.searchHotel(hotelDTO.getSeqHotelCategory(), hotelDTO.getDate(), hotelDTO.getAddr(), hotelDTO.getMinPrice(), hotelDTO.getMaxPrice());
	}

	

	@Override
	public Integer saveReservation(ReservationDTO reservationDTO) {
	    try {
	        // 예약 정보 저장
	        ReservationDTO savedReservation = reservationDAO.save(reservationDTO);

	        // 예약 정보를 저장한 이후에 바로 조회
	        Optional<ReservationDTO> optionalUpdatedReservation = reservationDAO.findByEmailAndReservationDate(savedReservation.getEmail(), savedReservation.getReservationDate());

	        // 조회된 정보가 있으면 seqReservation 반환, 없으면 null 반환
	        return optionalUpdatedReservation.get().getSeqReservation();//.map(ReservationDTO::getSeqReservation).orElse(null);
	    } catch (Exception e) {
	        // 예외를 처리하거나 로깅할 수 있습니다.
	        return null;
	    }
	}

    @Override
    public String saveReceipt(ReceiptDTO receiptDTO) {
        try {
            receiptDAO.save(receiptDTO);
            return "Receipt saved successfully";
        } catch (Exception e) {
            return "Failed to save receipt";
        }
    }
    
	
}
