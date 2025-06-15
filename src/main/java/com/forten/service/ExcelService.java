package com.forten.service;

import com.forten.mapper.ExcelMapper;
import com.forten.vo.ExcelDataVO;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelService {
    
    @Autowired
    private ExcelMapper excelMapper;

    @Autowired
    private PerformanceTestMapper performanceTestMapper;
    
    @Transactional
    public void performaceTestUpload(MultipartFile file) {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            List<ExcelDataVO> dataList = new ArrayList<>();
            
            // 엑셀 데이터 처리
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // 헤더 건너뛰기
                
                ExcelDataVO data = new ExcelDataVO();
                
                String name = getCellValueAsString(row.getCell(0)); // 이름
                String gender = getCellValueAsString(row.getCell(1)); // 성별
                String recordYm = getCellValueAsString(row.getCell(2)); // 월별 
                String regionCode = getCellValueAsString(row.getCell(3)); // 교육원
                String schoolCode = getCellValueAsString(row.getCell(4)); // 학교

                // 실기기
                BigDecimal pfJump = BigDecimal.valueOf(getCellValueAsString(row.getCell(5))); // 제자리멀리뛰기
                BigDecimal pfSitup = BigDecimal.valueOf(getCellValueAsString(row.getCell(6))); // 윗몸일으키기
                BigDecimal pfZrun = BigDecimal.valueOf(getCellValueAsString(row.getCell(7))); // z런달리기
                BigDecimal pfMedicine = BigDecimal.valueOf(getCellValueAsString(row.getCell(8))); // 메디신볼
                BigDecimal pfSprint100 = BigDecimal.valueOf(getCellValueAsString(row.getCell(9))); // 100m달리기
                BigDecimal pfFlex = BigDecimal.valueOf(getCellValueAsString(row.getCell(10))); // 유연성
                BigDecimal pfThrow = BigDecimal.valueOf(getCellValueAsString(row.getCell(11))); // 던지기
                BigDecimal pfBack = BigDecimal.valueOf(getCellValueAsString(row.getCell(12))); // 배근력
                BigDecimal pfShuttle10 = BigDecimal.valueOf(getCellValueAsString(row.getCell(13))); // 10m왕복
                BigDecimal pfShuttle20 = BigDecimal.valueOf(getCellValueAsString(row.getCell(14))); // 20m왕복

                // 성별 코드 변경
                if('남'.equals(gender)) {
                    gender = 'M';
                } else {
                    gender = 'W';
                }

                // 공통적으로 들어가는 데이터 세팅
                data.setName(name);
                data.setGender(gender);
                data.setRecordYm(recordYm);
                data.setRegionCode(regionCode);
                data.setSchoolCode(schoolCode);

                // 실기별 데이터
                String pfName = "";
                BigDecimal score = 0;

                for(int i = 0; i < 10; i++) {
                    switch(i) {
                        case 0 :
                            if(pfJump > 0 || pfJump != null) {
                                pfName = "jump";
                                score = pfJump;
                            }
                            break;
                        case 1 :
                            if(pfSitup > 0 || pfSitup != null) {
                                pfName = "situp";
                                score = pfSitup;
                            }
                            break;
                        case 2 :
                            if(pfZrun > 0 || pfZrun != null) {
                                pfName = "zrun";
                                score = pfZrun;
                            }
                            break;
                        case 3 :
                            if(pfMedicine > 0 || pfMedicine != null) {
                                pfName = "medicine";
                                score = pfMedicine;
                            }
                            break;
                        case 4 :
                            if(pfSprint100 > 0 || pfMedicinpfSprint100e != null) {
                                pfName = "sprint100";
                                score = pfSprint100;
                            }
                            break;
                        case 5 :
                            if(pfFlex > 0 || pfFlex != null) {
                                pfName = "flex";
                                score = pfFlex;
                            }
                            break;
                        case 6 :
                            if(pfThrow > 0 || pfThrow != null) {
                                pfName = "throw";
                                score = pfThrow;
                            }
                            break;
                        case 7 :
                            if(pfBack > 0 || pfBack != null) {
                                pfName = "back";
                                score = pfBack;
                            }
                            break;
                        case 8 :
                            if(pfShuttle10 > 0 || pfShuttle10 != null) {
                                pfName = "shuttle10";
                                score = pfShuttle10;
                            }
                            break;
                        case 9 :
                            if(pfShuttle20 > 0 || pfShuttle20 != null) {
                                pfName = "shuttle20";
                                score = pfShuttle20;
                            }
                            break;
                    }

                    data.setPfName(pfName);
                    data.setScore(score);

                    dataList.add(data);
                }
            }
            
            for(ExcelDataVO data : dataList) {
                ExcelDataVO beforeData = null;
                beforeData = excelMapper.selectUploadBeforeStudent(data);

                if(beforeData == null) {
                    // excelMapper.insertExcelData(data); // insert문
                }

                // 기록 insert
                excelMapper.insertPerformanceTest(data);
            }
            
        } catch (Exception e) {
            throw new RuntimeException("엑셀 파일 처리 중 오류 발생", e);
        }
    }
    
    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
} 