package user.service;


import jpa.bean.UserDTO;
import java.util.List;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;


public interface UserService {

	public String accountWrite(UserDTO userDTO);
	public List<HotelCategoryDTO> getHotelCategoryList();
	public List<HotelDTO> getHotelList(String seqHotelCategory);
	boolean existsByEmail(String email);

	

}
