package manager.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.bean.HotelDTO;

import manager.service.ManagerService;


@CrossOrigin
@Controller
@RequestMapping(value = "manager")
public class ManagerController {

	@Autowired
	private ManagerService managerService;
	
	@PostMapping(value = "addPlace")
	@ResponseBody
	public int addPlace(@ModelAttribute HotelDTO hotelDTO) {
		System.out.println(hotelDTO.toString());
		// 쉼표 빼기 작업
		hotelDTO.setSeqHotelCategory(commaClearInt(hotelDTO.getSeqHotelCategory()));
		hotelDTO.setKeyword(commaClearStr(hotelDTO.getKeyword()));
		hotelDTO.setImg(commaClearStr(hotelDTO.getImg()));
		// DB Action
		managerService.addPlace(hotelDTO);
		int result = managerService.importSeq(hotelDTO.getOwnerEmail(), hotelDTO.getName(), hotelDTO.getAddr());
		return result; // 값 확인, 배포 시 void로 변경
	}
	
	public String commaClearInt(String sample) {
		ArrayList<Integer> list = new ArrayList<>();
		StringTokenizer st = new StringTokenizer(sample, ",");
		while(st.hasMoreTokens()) {
			list.add(Integer.parseInt(st.nextToken()));
		}
		Collections.sort(list);
		String value = "";
		for(int a : list) {
			if(value.equals("")) {
				value += a;
			}else {
				value +=","+a;
			}
		}
		System.out.println(value);
		return value;
	}
	public String commaClearStr(String sample) {
		ArrayList<String> list = new ArrayList<>();
		StringTokenizer st = new StringTokenizer(sample, ",");
		while(st.hasMoreTokens()) {
			list.add(st.nextToken());
		}
		
		String value = "";
		for(String a : list) {
			if(value.equals("")) {
				value += a;
			}else {
				value +=","+a;
			}
		}
		System.out.println(value);
		return value;
	}
	public String redirectSystem(int callType) {
		return "";
	}
	
}
