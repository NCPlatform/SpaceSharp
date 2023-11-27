package chat.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import chat.service.ChatService;
import jpa.bean.ChattingDTO;

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

}
