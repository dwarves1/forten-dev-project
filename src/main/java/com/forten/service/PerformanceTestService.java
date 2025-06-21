package com.forten.service;

import com.forten.mapper.PerformanceTestMapper;
import com.forten.vo.PerformanceTestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.io.File;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.math.BigDecimal;
import java.lang.reflect.Field;

@Service
public class PerformanceTestService {
    
    @Autowired
    private PerformanceTestMapper performanceTestMapper;
    
    public List<PerformanceTestVO> selectListAllPerformanceTest(PerformanceTestVO performanceTestVO) {
        return performanceTestMapper.selectListAllPerformanceTest(performanceTestVO);
    }

    public List<PerformanceTestVO> selectListAllStudent(PerformanceTestVO performanceTestVO) {
        return performanceTestMapper.selectListAllStudent(performanceTestVO);
    }

    public void insertStudent(PerformanceTestVO performanceTestVO) {
        try {
            MultipartFile imageFile = performanceTestVO.getImageFile();
            if(imageFile != null && !imageFile.isEmpty()) {
                String mimeType = imageFile.getContentType();
                String ext = "";

                if(mimeType != null && mimeType.contains("/")) {
                    ext = mimeType.split("/")[1];
                } else {
                    ext = "jpg";
                }

                if("jpeg".equals(ext)) {
                    ext = "jpg";
                }

                String fullName = performanceTestVO.getFileName() + "." + ext;
                String uploadDir;
                
                if (System.getProperty("os.name").toLowerCase().contains("win")) {
                    uploadDir = "C:/temp/uploads/"; // 윈도우 개발 환경용 경로
                } else {
                    uploadDir = "/home/ubuntu/app/images/"; // 리눅스 서버용 경로
                }

                File dir = new File(uploadDir);
                if(!dir.exists()) {
                    dir.mkdirs();
                }

                File targetFile = new File(uploadDir, fullName);
                imageFile.transferTo(targetFile);
                performanceTestVO.setImageSrc(fullName);
            }

            performanceTestMapper.insertStudent(performanceTestVO);

        } catch (IOException | RuntimeException error) {
            error.printStackTrace();
             throw new RuntimeException("학생 등록 처리 중 오류가 발생했습니다.", error);
        }

    }

    public void insertPerformanceRecord(PerformanceTestVO performanceTestVO) {
        Field[] fields = PerformanceTestVO.class.getDeclaredFields();

        for(Field field : fields) {
            String fieldName = field.getName();

            if(fieldName.startsWith("pf")) {
                field.setAccessible(true);

                try {
                    Object value = field.get(performanceTestVO);

                    if (value != null && value instanceof BigDecimal score) {
                        String eventCode = fieldName.substring(2).toLowerCase();

                        PerformanceTestVO vo = new PerformanceTestVO();
                        vo.setRecordYm(performanceTestVO.getRecordYm());
                        vo.setStudentCode(performanceTestVO.getStudentCode());
                        vo.setEventCode(eventCode);
                        vo.setScore(score);

                        PerformanceTestVO selectPerformanceTestVO = null;
                        selectPerformanceTestVO = performanceTestMapper.selectPerformaceRecord(vo);

                        if (selectPerformanceTestVO != null) {
                            performanceTestMapper.updatePerformanceRecord(vo);
                        } else {
                            performanceTestMapper.insertPerformanceRecord(vo);
                        }

                    }
                } catch (IllegalAccessException error) {
                    throw new RuntimeException("실기 필드 접근 오류: " + fieldName, error);
                }
            }
        }
    }
} 