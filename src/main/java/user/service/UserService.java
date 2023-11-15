package user.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;


public interface UserService {

	public String login(UserDTO userDTO);
	
	public String write(BoardDTO boardDTO);

	public Page<BoardDTO> list(Pageable pageable);

	public Optional<BoardDTO> getBoard(int seqBoard);

	public Object update(BoardDTO boardDTO);

	public void delete(int seqBoard);

	public String accountWrite(UserDTO userDTO);
	
	public List<HotelCategoryDTO> getHotelCategoryList();
	
	public List<HotelDTO> getHotelList(String seqHotelCategory);
}
