package admin.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

import admin.service.AdminService;
import jakarta.servlet.http.HttpSession;
import jpa.bean.CouponDTO;
import jpa.bean.EventDTO;
import jpa.bean.UserDTO;
import manager.service.ObjectStorageService;

@CrossOrigin
@Controller
@RequestMapping(value = "admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private ObjectStorageService ncpService;
	
	private String bucketName = "spacesharpbucket";
	
	@GetMapping("getUserList")
	@ResponseBody
	public Page<UserDTO> getUserList(@PageableDefault(page=0, size=10, sort="email", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String filterUser){
		System.out.println(pageable);
		return adminService.getUserList(pageable,filterUser);
	}
	
	@GetMapping("getCouponList")
	@ResponseBody
	public Map<String, Object> getCouponList(@PageableDefault(page=0, size=10, sort="email", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String searchValue){
		return adminService.getCouponList(pageable,searchValue);
	}
	
	@PostMapping("addCoupon")
	@ResponseBody
	public void addCoupon(@ModelAttribute CouponDTO couponDTO){
		adminService.addCoupon(couponDTO);
	}
	
	@GetMapping("getEventList")
	@ResponseBody
	public Map<String, Object> getEventList(@PageableDefault(page=0, size=10, sort="seqEvent", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String searchKey){
		return adminService.getEventList(pageable,searchKey);
	}
	
	@PostMapping(value="addEvent")
	@ResponseBody
	public void  addEvent (@RequestPart EventDTO eventDTO, @RequestPart(required = false) List<MultipartFile> list, @RequestPart(required = false) List<MultipartFile> bannerList, HttpSession session) {

		if(list != null) {
			String imgValue = uploadObject(list, "event");
			eventDTO.setImg(imgValue);
		}
		
		if(bannerList != null) {
			String imgValue = uploadObject(bannerList, "eventBanner");
			eventDTO.setMainImg(imgValue);
		}
		System.out.println(eventDTO);
		adminService.addEvent(eventDTO);
		
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
