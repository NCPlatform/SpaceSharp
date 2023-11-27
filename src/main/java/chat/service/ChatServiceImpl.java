package chat.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingParticipantDTO;
import jpa.bean.ChattingRoomDTO;
import jpa.bean.UserDTO;
import jpa.dao.ChattingDAO;
import jpa.dao.ChattingParticipantDAO;
import jpa.dao.ChattingRoomDAO;
import jpa.dao.UserDAO;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	ChattingDAO chattingDAO;

	@Autowired
	ChattingRoomDAO chattingRoomDAO;
	
	@Autowired
	ChattingParticipantDAO chattingParticipantDAO;

	@Override
	public Map<String, Object> getChatList(String email) {
		
		List<ChattingParticipantDTO> participantList = chattingParticipantDAO.findAllByMemberemail(email);
		List<ChattingRoomDTO> roomList = new ArrayList<ChattingRoomDTO>();
		List<ChattingDTO> chatList = new ArrayList<ChattingDTO>();
		List<UserDTO> userList = new ArrayList<UserDTO>();
		List<ChattingParticipantDTO> otherParticipantList = new ArrayList<ChattingParticipantDTO>();
		
		for(ChattingParticipantDTO dto : participantList) {
			roomList.addAll(chattingRoomDAO.findAllByChannelId(dto.getChannelId()));
			chatList.addAll(chattingDAO.findAllByChannelId(dto.getChannelId()));
			otherParticipantList.addAll(chattingParticipantDAO.findAllByChannelId(dto.getChannelId()));
		}
		
		for(ChattingParticipantDTO dto : otherParticipantList) {
			userList.addAll(userDAO.findAllByEmail(dto.getMemberemail()));
		}
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("roomList", roomList);
		map.put("chatList", chatList);
		map.put("userList", userList);
		
		return map;
	}

	@Override
	public void addChat(ChattingDTO chatDto) {
		System.out.println("글 쓰기");
		chattingDAO.save(chatDto);
		
	}

}
