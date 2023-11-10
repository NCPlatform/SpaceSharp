package user.service;

import java.util.List;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;

public interface UserService {

    String getHotelName(int seqHotel);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);

}

