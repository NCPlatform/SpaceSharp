package chat.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import chat.service.ChatService;
import jpa.bean.ChattingRoomDTO;

@CrossOrigin
@RestController
@RequestMapping(path="chat")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
    
    @GetMapping("getChatList")
    @ResponseBody
    public Map<String,Object> getChatList(String email){
    	return chatService.getChatList(email);
    }
    
    @GetMapping("createRoom")
    @ResponseBody
    public String createRoom(int seqHotel, String email) {
    	return chatService.createRoom(seqHotel, email);
    }
    
    @PostMapping("changeRoomName")
    @ResponseBody
    public String changeRoomName(ChattingRoomDTO dto) {
    	return chatService.changeRoomName(dto);
    }
    
    @GetMapping("deleteRoom")
    @ResponseBody
    public String deleteRoom(int channelId, String email) {
    	return chatService.deleteRoom(channelId, email);
    }

}
