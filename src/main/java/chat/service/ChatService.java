package chat.service;

import java.util.List;
import java.util.Map;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingRoomDTO;

public interface ChatService {

	public Map<String, Object> getChatList(String email);

	public void addChat(ChattingDTO chatDto);

	public String createRoom(int seqHotel,String email);

	public String changeRoomName(ChattingRoomDTO dto);

	public String deleteRoom(int channelId, String email);

}
