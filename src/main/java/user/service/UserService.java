package user.service;

import java.util.List;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;

public interface UserService {

	public String getHotelName(int seqHotel);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);
	
	public String getMainKeyword(int seqHotel);

	public String getSubscribe(int seqHotel);
	
	public String getTags(int seqHotel);
	
	public String getPlaceEx(int seqHotel);

	public String getWorkinghour(int seqHotel);

	public String getHoliday(int seqHotel);

	public String getImages(int seqHotel);
	
	public HotelDTO getHotelInfo(int seqHotel);

	public String getAddr(int seqHotel);
	
	public UserDTO getUserByEmail(String email);

}