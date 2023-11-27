package chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import jpa.bean.ChattingDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSockerController {
	private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(ChattingDTO chatDto, SimpMessageHeaderAccessor accessor) {
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
    }
}
