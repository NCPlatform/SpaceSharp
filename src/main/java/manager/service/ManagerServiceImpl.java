package manager.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jpa.bean.CommentDTO;
import jpa.bean.HotelDTO;
import jpa.bean.ReservationDTO;
import jpa.bean.RoomDTO;
import jpa.dao.CommentDAO;
import jpa.dao.HotelDAO;
import jpa.dao.ReservationDAO;
import jpa.dao.RoomDAO;

@Service
public class ManagerServiceImpl implements ManagerService {
	
	@Autowired
	HotelDAO hotelDAO;
	
	@Autowired
	RoomDAO roomDAO;
	
	@Autowired
	ReservationDAO reservationDAO;
	
	@Autowired
	CommentDAO commentDAO;
	
	@Override
	public void addPlace(HotelDTO hotelDTO) {
		hotelDAO.save(hotelDTO);
	}

	@Override
	public int importSeq(String ownerEmail, String name, String addr) {
		int result = hotelDAO.importSeq(ownerEmail, addr, name);
		return result;
	}

	@Override
	public void addRoom(RoomDTO roomDTO) {
		roomDAO.save(roomDTO);
		
	}

	@Override
	public Page<HotelDTO> getMyPlace(String email, Pageable pageable) {
		
	//	Page<HotelDTO> list = hotelDAO.findAllByOwnerEmail(email, pageable);
		Page<HotelDTO> list = hotelDAO.getMyPlace(email, pageable);
		return list;
	}

	@Override
	public List<RoomDTO> getMyroom(String seqHotel) {
		int param = Integer.parseInt(seqHotel);
		 // List<RoomDTO> list = roomDAO.getMyRoom(param);
		List<RoomDTO> list = roomDAO.findBySeqHotel(param); 
		return list;
	}

	@Override
	public Optional<HotelDTO> viewPlaceInfo(String seq) {
		Optional<HotelDTO> resultDTO = hotelDAO.findById(Integer.parseInt(seq));
		return resultDTO;
	}
	
	

	@Override
	public void deletePlace(String seqHotel) {
		hotelDAO.deleteById(Integer.parseInt(seqHotel));
	}

	@Override
	public Optional<RoomDTO> viewRoomInfo(String seq) {
		Optional<RoomDTO> resultDTO = roomDAO.findById(Integer.parseInt(seq));
		return resultDTO;
	}

	@Override
	public void deleteRoom(String seqRoom) {
		roomDAO.deleteById(Integer.parseInt(seqRoom));
		
	}

	@Override
	public Map<String, Object> getReviewList(String email) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<HotelDTO> hotelList = hotelDAO.findAllByOwnerEmail(email);
		List<RoomDTO> roomList = roomDAO.findAllByOwnerEmail(email);
		List<ReservationDTO> reservationList = reservationDAO.findAllByOwnerEmail(email);
		List<CommentDTO> commentList = commentDAO.findAllByOwnerEmail(email);
		
		map.put("hotelList", hotelList);
		map.put("roomList", roomList);
		map.put("reservationList", reservationList);
		map.put("commentList", commentList);
		
		return map;
	}

}
