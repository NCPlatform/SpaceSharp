package user.service;

import java.util.List;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;

public interface UserService {

	public String getHotelName(int seqHotel);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);
	
	public String getMainKeyword(int seqHotel);

	public String getSubscribe(int seqHotel);
	
	public String getTags(int seqHotel);

}

