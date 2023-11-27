package chat.service;

import java.util.List;
import java.util.Map;

import jpa.bean.ChattingDTO;

public interface ChatService {

	public Map<String, Object> getChatList(String email);

	public void addChat(ChattingDTO chatDto);

}
