package manager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.HotelDTO;
import jpa.bean.RoomDTO;

public interface ManagerService {

	public void addPlace(HotelDTO hotelDTO);

	public int importSeq(String ownerEmail, String name, String addr);

	public void addRoom(RoomDTO roomDTO);

	public Page<HotelDTO> getMyPlace(String email, Pageable pageable);

	public List<RoomDTO> getMyroom(String seqHotel);

	public Optional<HotelDTO> viewPlaceInfo(String seq);

	public void deletePlace(String seqHotel);

	public Optional<RoomDTO> viewRoomInfo(String seq);

}
