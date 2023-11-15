package manager.service;

import jpa.bean.HotelDTO;

public interface ManagerService {

	public void addPlace(HotelDTO hotelDTO);

	public int importSeq(String ownerEmail, String name, String addr);

}
