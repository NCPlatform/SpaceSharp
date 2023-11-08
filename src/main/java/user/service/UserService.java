package user.service;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;

public interface UserService {

	public String login(UserDTO userDTO);
	
	public String write(BoardDTO boardDTO);

	public String list(BoardDTO boardDTO);

}
