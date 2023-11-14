package user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import jpa.bean.BoardDTO;
import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;

import jpa.dao.BoardDAO;
import jpa.dao.HotelCategoryDAO;
import jpa.dao.HotelDAO;
import jpa.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private HotelCategoryDAO hotelCategoryDAO;
	
	@Autowired
	private HotelDAO hotelDAO;
	
	@Autowired
	private BoardDAO boardDAO;
	
	UserDAO userDAO;

	@Override
	public List<HotelCategoryDTO> getHotelCategoryList() {
		return hotelCategoryDAO.findAll();
	}

	@Override
	public List<HotelDTO> getHotelList(String seqHotelCategory) {
		return hotelDAO.findBySeqHotelCategoryContaining(seqHotelCategory);
	}
	
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
	public Optional<BoardDTO> getBoard(int seqRefSeqBoard) {
		return boardDAO.getBySeqRefBoard(seqRefSeqBoard);
	}

	@Override
	public String write(BoardDTO boardDTO) {
		boardDAO.save(boardDTO);
		
		return "";
	}

	@Override
	public Page<BoardDTO> list(Pageable pageable) {
		 
		Page<BoardDTO> list = boardDAO.findAll(pageable);
		
		return list;
		 
	}

	@Override
	public Object update(BoardDTO boardDTO) {
		  try {
		        // save 메서드를 이용하여 데이터를 업데이트
		        boardDAO.save(boardDTO);
		        return "success";
		    } catch (Exception e) {
		        e.printStackTrace();
		        return "fail";
		    }
	}

	@Override
	public void delete(int seqBoard) {
		
		System.out.println(seqBoard);
		boardDAO.deleteById(seqBoard);
		
	}
}
