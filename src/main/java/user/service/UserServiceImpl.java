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
import jpa.dao.RoomDAO;
import jpa.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private HotelDAO hotelDAO;
	
	@Autowired
	private BoardDAO boardDAO;
	
	@Autowired
	private RoomDAO roomDAO;
	
	@Autowired
	private HotelCategoryDAO hotelCategoryDAO;
	
	@Override
	public String accountWrite(UserDTO userDTO) {
				
		userDAO.save(userDTO);
		return "리턴 성공";
	}

	@Override
	public List<HotelCategoryDTO> getHotelCategoryList() {
		return hotelCategoryDAO.findAll();
	}

	@Override
	public List<HotelDTO> getHotelList(String seqHotelCategory) {
		return hotelDAO.findBySeqHotelCategoryContaining(seqHotelCategory);
	}
	
	@Override
	public Optional<UserDTO> login(UserDTO userDTO) {
		return userDAO.findById(userDTO.getEmail());
	}

	@Override
	public Optional<BoardDTO> getBoard(int seqRefSeqBoard) {
		return boardDAO.findById(seqRefSeqBoard);
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
