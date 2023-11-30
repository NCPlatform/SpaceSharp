package chat.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import chat.service.ChatService;
import jpa.bean.ChattingDTO;

@RestController
public class WebSockerController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	private ChatService chatService;

    @MessageMapping("/chat")
    public void sendMessage(@ModelAttribute ChattingDTO chatDto) {
    	
    	chatService.addChat(chatDto);
    	
    	chatDto.setReleaseDate(new Date());
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
    }
}
