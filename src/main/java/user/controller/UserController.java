package user.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping(value="login")
	@ResponseBody
	public String login(@ModelAttribute UserDTO userDTO) {
		return userService.login(userDTO);
		
	}
	
	@PostMapping(value="write")
	@ResponseBody
	public String write(@ModelAttribute BoardDTO boardDTO) {
		return userService.write(boardDTO);
	}
	
	@GetMapping(value="list")
	@ResponseBody
	public Page<BoardDTO> list(@PageableDefault(page=0, size=10, sort="seqBoard", direction = Sort.Direction.DESC) Pageable pageable) {
		
		return userService.list(pageable);
	}
	
	@GetMapping(path = "getBoard")
	@ResponseBody
	public Optional<BoardDTO> getBoard(@RequestParam int seqBoard){
	    System.out.println("출력 : " + userService.getBoard(seqBoard));
		return userService.getBoard(seqBoard);
	}
	
	@PutMapping(path = "update")
	@ResponseBody
	public void update(@ModelAttribute BoardDTO boardDTO) {
		userService.update(boardDTO);
	}
	
	@DeleteMapping(path = "delete")
	@ResponseBody
	public void delete(@RequestParam int seqBoard) {
		userService.delete(seqBoard);
	}
	
}
