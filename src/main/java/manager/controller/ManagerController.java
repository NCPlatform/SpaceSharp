package manager.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import jpa.bean.HotelDTO;
import jpa.bean.RoomDTO;
import manager.service.ManagerService;
import manager.service.ObjectStorageService;


@CrossOrigin
@Controller
@RequestMapping(value = "manager")
public class ManagerController {
	
	@Autowired
	private ManagerService managerService;

	@Autowired
	private ObjectStorageService ncpService;
	
	private String bucketName = "spacesharpbucket";
	
	
	@PostMapping(value = "addedPlace")
	@ResponseBody
	public int addedPlace(@RequestPart HotelDTO hotelDTO,
				@RequestPart("img") List<MultipartFile> list,
				HttpSession session ) {
		
		String imgValue = uploadObject(list, "hotel");
		
		// 쉼표 빼기 작업
		hotelDTO.setSeqHotelCategory(commaClearInt(hotelDTO.getSeqHotelCategory()));
		hotelDTO.setKeyword(commaClearStr(hotelDTO.getKeyword()));
		hotelDTO.setImg(imgValue);
		String holiday = commaClearStr(hotelDTO.getHoliday());
		if(holiday.equals("")) {
			hotelDTO.setHoliday("없음");
		}
		
		System.out.println(hotelDTO.toString());
		
		// DB Action
		managerService.addPlace(hotelDTO);
		int result = managerService.importSeq(hotelDTO.getOwnerEmail(), hotelDTO.getName(), hotelDTO.getAddr());
		return result; // 값 확인, 배포 시 void로 변경
	}
	
	@PostMapping(value = "addedRoom")
	@ResponseBody
	public void addedRoom(@RequestPart RoomDTO roomDTO,
			@RequestPart("img") List<MultipartFile> list,
			HttpSession session ) {
	
		String imgValue = uploadObject(list, "room");
		
		System.out.println(roomDTO.toString());
		roomDTO.setImg(imgValue);
		managerService.addRoom(roomDTO);
		
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
	
	public String uploadObject(List<MultipartFile> list, String path) {
		String fileName = "https://kr.object.ncloudstorage.com/spacesharpbucket/storage/"+path+"/";
		ArrayList<String> fileNames = new ArrayList<>();
		
		for(MultipartFile img : list) {
				fileName += ncpService.uploadFile(bucketName, "storage/"+path+"/", img);
				fileNames.add(fileName);
			}
		
		String imgValue = "";
		
		for(String img : fileNames) {
			if(imgValue.equals("")) {
				imgValue += img;
			}else {
				imgValue +=","+img;
			}
		}
		
		return imgValue;
	}
	
}
