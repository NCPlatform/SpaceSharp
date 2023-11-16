package manager.service;

import jpa.bean.HotelDTO;
import jpa.bean.RoomDTO;

public interface ManagerService {

	public void addPlace(HotelDTO hotelDTO);

	public int importSeq(String ownerEmail, String name, String addr);

	public void addRoom(RoomDTO roomDTO);

}
