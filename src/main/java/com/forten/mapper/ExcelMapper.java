package com.forten.mapper;

import com.forten.vo.ExcelDataVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ExcelMapper {
    // 학생 조회
    ExcelDataVO selectUploadBeforeStudent(ExcelDataVO data);
    
    // 기록 데이터 등록
    void insertPerformanceTest(ExcelDataVO data);
} 