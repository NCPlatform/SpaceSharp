package manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.HotelDTO;
import jpa.dao.HotelDAO;

@Service
public class ManagerServiceImpl implements ManagerService {
	
	// Autowired DAO
	@Autowired
	HotelDAO hotelDAO;
	
	@Override
	public void addPlace(HotelDTO hotelDTO) {
		hotelDAO.save(hotelDTO);
	}

	@Override
	public int importSeq(String ownerEmail, String name, String addr) {
		int result = hotelDAO.importSeq(ownerEmail, addr, name);
		return result;
	}

}
