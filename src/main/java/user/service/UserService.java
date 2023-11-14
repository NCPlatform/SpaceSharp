package user.service;

import java.util.List;
import java.util.Optional;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;

public interface UserService {

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);

	public Optional<BoardDTO> getBoard(int seqRefSeqBoard);

	public void write(BoardDTO boardDTO);

}
