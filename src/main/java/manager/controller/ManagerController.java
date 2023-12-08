package manager.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import jpa.bean.HotelDTO;
import jpa.bean.ReserveViewDTO;
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
	
	@PostMapping(value = "viewPlaceInfo")
	@ResponseBody
	public Optional<HotelDTO> viewPlaceInfo(@RequestParam String seq) {
		System.out.println("viewPlaceInfo requested : "+seq);
		Optional<HotelDTO> returnDTO = managerService.viewPlaceInfo(seq);
		
		return returnDTO;
	}
	
	@PostMapping(value = "viewRoomInfo")
	@ResponseBody
	public Optional<RoomDTO> viewRoomInfo(@RequestParam String seq){
		System.out.println("viewRoomInfo requested : "+seq);
		Optional<RoomDTO> returnDTO = managerService.viewRoomInfo(seq);
		return returnDTO;
	}
 	
	@PostMapping(value = "addedPlace")
	@ResponseBody
	public int addedPlace(@RequestPart HotelDTO hotelDTO,
				@RequestPart("img") List<MultipartFile> list,
				HttpSession session ) {
		
		String imgValue = uploadObject(list, "hotel");
		
		// 쉼표 빼기 작업
		hotelDTO.setSeqHotelCategory(commaClearStr(hotelDTO.getSeqHotelCategory(), true));
		hotelDTO.setKeyword(commaClearStr(hotelDTO.getKeyword(), false));
		hotelDTO.setImg(imgValue);
		hotelDTO.setFacilities(commaClearStr(hotelDTO.getFacilities(), false));
		hotelDTO.setAlert(commaClearStr(hotelDTO.getAlert(), false));
		hotelDTO.setRefund(commaClearStr(hotelDTO.getRefund(), false));
		String holiday = commaClearStr(hotelDTO.getHoliday(), true);
		if(holiday.equals("")) {
			hotelDTO.setHoliday("없음");
		}else {
			hotelDTO.setHoliday(holiday);
		}
		
		System.out.println(hotelDTO.toString());
		
		// DB Action
		managerService.addPlace(hotelDTO);
		int result = managerService.importSeq(hotelDTO.getOwnerEmail(), hotelDTO.getName(), hotelDTO.getAddr());
		return result; // 값 확인, 배포 시 void로 변경
		
	}
	
	@PostMapping(value = "addedPlaceWithoutImage")
	@ResponseBody
	public void addedPlaceWithoutImage(@RequestPart HotelDTO hotelDTO) {
		// 쉼표 빼기 작업
		hotelDTO.setSeqHotelCategory(commaClearStr(hotelDTO.getSeqHotelCategory(), true));
		hotelDTO.setKeyword(commaClearStr(hotelDTO.getKeyword(), false));
		hotelDTO.setFacilities(commaClearStr(hotelDTO.getFacilities(), false));
		hotelDTO.setAlert(commaClearStr(hotelDTO.getAlert(), false));
		hotelDTO.setRefund(commaClearStr(hotelDTO.getRefund(), false));
		String holiday = commaClearStr(hotelDTO.getHoliday(), true);
		if(holiday.equals("")) {
			hotelDTO.setHoliday("없음");
		}else {
			hotelDTO.setHoliday(holiday);
		}
				
		System.out.println("requested addedPlaceWithoutImage : only HotelDTO");
		System.out.println(hotelDTO.toString());
		managerService.addPlace(hotelDTO);
	}
	
	@PostMapping(value = "addedRoomWithoutImage")
	@ResponseBody
	public void addedRoomWithoutImage(@RequestPart RoomDTO roomDTO) {
		
		System.out.println("requested addedRoomWithoutImage : only roomDTO");
		System.out.println(roomDTO.toString());
		managerService.addRoom(roomDTO);
		
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
	
	@PostMapping(value = "getMyPlace")
	@ResponseBody
	public Page<HotelDTO> getMyPlace(@PageableDefault(page=0, size=15, sort="name", direction=Sort.Direction.DESC) Pageable pageable, String email) {
		System.out.println("email value is " + email);
		
		Page<HotelDTO> list = managerService.getMyPlace(email, pageable);
		return list;
	}
	
	@PostMapping(value = "getMyRoom")
	@ResponseBody
	public List<RoomDTO> getMyRoom(@RequestParam String seqHotel){
		System.out.println(seqHotel);
		
		List<RoomDTO> list = managerService.getMyroom(seqHotel);
		return list;
	}
	
	@PostMapping(value = "deletePlace")
	@ResponseBody
	public void deletePlace(@RequestParam String seqHotel) {
		System.out.println("deletePlace requested : "+seqHotel);
		managerService.deletePlace(seqHotel);
	}
	
	@PostMapping(value = "deleteRoom")
	@ResponseBody
	public void deleteRoom(@RequestParam String seqRoom) {
		System.out.println("deleteRoom requested : " + seqRoom);
		managerService.deleteRoom(seqRoom);
		
	}
	
	@GetMapping("getReviewList")
	@ResponseBody
	public Map<String,Object> getReviewList(@RequestParam String email){
		return managerService.getReviewList(email);
	}
	
	@PostMapping(value = "getMyReservations")
	@ResponseBody
	public List<ReserveViewDTO> viewReservations(@RequestParam String userEmail){
		System.out.println("reservation view requested : "+userEmail);
		List<ReserveViewDTO> resultDTO = managerService.viewReservations(userEmail);
		return resultDTO;
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
				value +=", "+a;
			}
		}
		value += ",";
		System.out.println(value);
		return value;
	}
	public String commaClearStr(String sample, boolean blank) {
		ArrayList<String> list = new ArrayList<>();
		StringTokenizer st = new StringTokenizer(sample, ",");
		while(st.hasMoreTokens()) {
			list.add(st.nextToken());
		}
		
		String value = "";
		for(String a : list) {
			
			if(!a.isBlank()){
				if(value.equals("")) {
					if(a.strip().equals("없음")) // FOR ONLY HOLIDAYS
						a = "";
						value += a.strip();
				}else {
					if(blank) {
						if(a.strip().equals("없음")) // FOR ONLY HOLIDAYS
							a = "";
						value +=", "+a.strip();
					}
					else {
						if(a.strip().equals("없음")) // FOR ONLY HOLIDAYS
							a = "";
						value +=","+a.strip();
					}
				}	
			}
		}
		System.out.println(value);
		return value;
	}
	
	public String uploadObject(List<MultipartFile> list, String path) {
		String fileName;
		ArrayList<String> fileNames = new ArrayList<>();
		
		for(MultipartFile img : list) {
				fileName = "https://kr.object.ncloudstorage.com/spacesharpbucket/storage/"+path+"/";
				fileName += ncpService.uploadFile(bucketName, "storage/"+path+"/", img);
				fileNames.add(fileName);
			}
		String imgValue = "";
		
		for(String img : fileNames) {
			if(imgValue.equals("")) {
				imgValue += img;
			}else {
				imgValue +=", "+img;
			}
		}
		return imgValue;
	}
}
