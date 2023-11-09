package user.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;

public interface UserService {

	public String login(UserDTO userDTO);
	
	public String write(BoardDTO boardDTO);

	public Page<BoardDTO> list(Pageable pageable);

	public Optional<BoardDTO> getBoard(int seqBoard);

	
}
