package manager.service;

import java.io.InputStream;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import naver.conf.NaverConfiguration;

@Service
public class ObjectStorageService {

	final AmazonS3 s3;
	
	public ObjectStorageService(NaverConfiguration naverConfiguration) {
		s3 = AmazonS3ClientBuilder
				.standard()
				.withEndpointConfiguration(
						new AwsClientBuilder.EndpointConfiguration(
									naverConfiguration.getEndPoint(),
									naverConfiguration.getRegionName())
				)
				.withCredentials(new AWSStaticCredentialsProvider(
							new BasicAWSCredentials(naverConfiguration.getAccessKey(),
													naverConfiguration.getSecretKey()))
				)
				.build();
	}
	
	public String uploadFile(String bucketName, String directoryPath, MultipartFile img) {
		System.out.println("NCP Service  진입");
		if(img.isEmpty()) return null;
		
		try(InputStream fileIn = img.getInputStream()) {
			System.out.println("NCP Service try 진입");
		//	String fileName = img.getOriginalFilename(); --> OriginalFileName으로 올라감
			String fileName = UUID.randomUUID().toString(); // --> UUID로 파일명 만듦
 			
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(img.getContentType());
			
			PutObjectRequest objectRequest =
					new PutObjectRequest(bucketName, directoryPath+fileName, fileIn, 
							objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);
			s3.putObject(objectRequest);
			System.out.println("filename = "+fileName);
			return fileName;
			
		}catch(Exception e) {
			throw new RuntimeException("파일 업로드 실패", e);
		}
		
	}

}
