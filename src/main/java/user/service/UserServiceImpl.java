package user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;
import jpa.dao.BoardDAO;
import jpa.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDAO userDAO;
	@Autowired
	BoardDAO boardDAO;
	
	@Override
	public String login(UserDTO userDTO) {
		
		Optional<UserDTO> user = userDAO.findById(userDTO.getEmail());
		
		if(user.isEmpty()) {
			return "none";
		}else if(user.get().getPassword().equals(userDTO.getPassword())) {
			return "true";
		}else {
			return "none";
		}
	}

	@Override
	public String write(BoardDTO boardDTO) {
		
		boardDAO.save(boardDTO);
		
		return "성공";
	}

	@Override
	public String list(BoardDTO boardDTO) {
		
		 List<BoardDTO> boardList = boardDAO.findAll();
		 
		 return "성공";
	}

}
