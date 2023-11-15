package user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;

public interface UserService {

	public String login(UserDTO userDTO);
	
	public String write(BoardDTO boardDTO);

	public Optional<BoardDTO> getBoard(int seqBoard);

	public Object update(BoardDTO boardDTO);

	public void delete(int seqBoard);

	public List<HotelCategoryDTO> getHotelCategoryList();

	public List<HotelDTO> getHotelList(String seqHotelCategory);

	public Page<BoardDTO> list(Pageable pageable, int seqRefSeqBoard);

	public Optional<BoardDTO> getReply(int seqRefSeqBoard);

}
