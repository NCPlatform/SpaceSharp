package manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.HotelDTO;
import jpa.bean.RoomDTO;
import jpa.dao.HotelDAO;
import jpa.dao.RoomDAO;

@Service
public class ManagerServiceImpl implements ManagerService {
	
	@Autowired
	HotelDAO hotelDAO;
	
	@Autowired
	RoomDAO roomDAO;
	
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

}
