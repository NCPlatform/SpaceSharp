package mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import mybatis.bean.HotelRoomDTO;

@Mapper
public interface AYDAO {

	@Select("SELECT * FROM User")
	List<HotelRoomDTO> findAll();
	
}
