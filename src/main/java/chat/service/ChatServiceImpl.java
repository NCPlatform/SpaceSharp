package chat.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingRoomDTO;
import jpa.bean.UserDTO;
import jpa.dao.ChattingDAO;
import jpa.dao.ChattingRoomDAO;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	ChattingDAO chattingDAO;

	@Autowired
	ChattingRoomDAO chattingRoomDAO;

	@Override
	public Map<String, Object> getChatList(String email) {
		
		List<ChattingRoomDTO> roomList = chattingRoomDAO.findAllByUsersContaining(email);
		List<ChattingDTO> chatList = new ArrayList<ChattingDTO>();
		List<UserDTO> userDTO = new ArrayList<UserDTO>();
		
		for(ChattingRoomDTO dto : roomList) {
			chatList.addAll(chattingDAO.findAllByChannelId(dto.getChannelId()));
		}
		
		for(ChattingDTO dto : chatList) {
			
		}
		
		System.out.println(roomList);
		System.out.println(chatList);
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("roomList", roomList);
		map.put("chatList", chatList);
		
		return map;
	}

}
