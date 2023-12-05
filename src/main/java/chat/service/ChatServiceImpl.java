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
import jpa.bean.HotelDTO;
import jpa.bean.UserDTO;
import jpa.dao.ChattingDAO;
import jpa.dao.ChattingParticipantDAO;
import jpa.dao.ChattingRoomDAO;
import jpa.dao.HotelDAO;
import jpa.dao.UserDAO;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	HotelDAO hotelDAO;
	
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
		List<UserDTO> userList = userDAO.findAll();
		List<ChattingParticipantDTO> otherParticipantList = new ArrayList<ChattingParticipantDTO>();
		
		for(ChattingParticipantDTO dto : participantList) {
			roomList.addAll(chattingRoomDAO.findAllByChannelId(dto.getChannelId()));
			chatList.addAll(chattingDAO.findAllByChannelIdOrderBySeqChatDesc(dto.getChannelId()));
			otherParticipantList.addAll(chattingParticipantDAO.findAllByChannelId(dto.getChannelId()));
		}
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("roomList", roomList);
		map.put("chatList", chatList);
		map.put("userList", userList);
		
		return map;
	}

	@Override
	public void addChat(ChattingDTO chatDto) {
		chattingDAO.save(chatDto);
		
	}

	@Override
	public String createRoom(int seqHotel, String email) {
		
		HotelDTO hoteldto = hotelDAO.findById(seqHotel).get();
		
		if(hoteldto.getOwnerEmail().equals(email)) {
			return "same";
		}else {
			List<ChattingParticipantDTO> participantListTemp = chattingParticipantDAO.findAllByMemberemail(email);
			List<ChattingParticipantDTO> participantList = new ArrayList<ChattingParticipantDTO>();
			
			int roomId = 0;
			
			for(ChattingParticipantDTO dto : participantListTemp) {
				participantList.addAll(chattingParticipantDAO.findAllByChannelId(dto.getChannelId()));
			}
			
			System.out.println(participantList);
			
			for(ChattingParticipantDTO dto : participantList) {
				if(dto.getMemberemail().equals(hoteldto.getOwnerEmail()))
					roomId = dto.getChannelId();
			}
			
			System.out.println(roomId);
			
			if(roomId != 0) {
				return "exist";
			}else {
				ChattingRoomDTO chatroomDTO = new ChattingRoomDTO();
				chatroomDTO.setName(email +","+ hoteldto.getOwnerEmail());
				chattingRoomDAO.save(chatroomDTO);
				
				ChattingRoomDTO createdRoomDTO = chattingRoomDAO.findByName(email +","+ hoteldto.getOwnerEmail());
				System.out.println(createdRoomDTO);
				
				ChattingParticipantDTO participantDTO1 = new ChattingParticipantDTO();
				participantDTO1.setChannelId(createdRoomDTO.getChannelId());
				participantDTO1.setMemberemail(email);
				chattingParticipantDAO.save(participantDTO1);
				
				ChattingParticipantDTO participantDTO2 = new ChattingParticipantDTO();
				participantDTO2.setChannelId(createdRoomDTO.getChannelId());
				participantDTO2.setMemberemail(hoteldto.getOwnerEmail());
				chattingParticipantDAO.save(participantDTO2);
			}
			
			return "success";
		}
		
	}

	@Override
	public String changeRoomName(ChattingRoomDTO dto) {
		chattingRoomDAO.save(dto);
		
		return "success";
	}

	@Override
	public String deleteRoom(int channelId, String email) {
		
		ChattingParticipantDTO dto = chattingParticipantDAO.findByChannelIdAndMemberemail(channelId, email);
		
		UserDTO user = userDAO.findByEmail(email);
		
		ChattingDTO chat = new ChattingDTO();
		chat.setChannelId(channelId);
		chat.setContent(user.getName() + "님이 나가셨습니다.");
		chat.setSenderemail("notice");
		
		chattingDAO.save(chat);
		chattingParticipantDAO.deleteById(dto.getSeqChatParticipant());
		return "success";
	}

}
