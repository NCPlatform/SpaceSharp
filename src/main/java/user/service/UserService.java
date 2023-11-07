package user.service;

import java.util.List;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;

public interface UserService {

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);

}
