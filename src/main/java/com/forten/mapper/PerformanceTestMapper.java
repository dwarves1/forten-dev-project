package com.forten.mapper;

import com.forten.vo.PerformanceTestVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PerformanceTestMapper {
    List<PerformanceTestVO> selectListAllPerformanceTest(PerformanceTestVO performanceTestVO);
    List<PerformanceTestVO> selectListAllStudent(PerformanceTestVO performanceTestVO);
    PerformanceTestVO selectPerformaceRecord(PerformanceTestVO performanceTestVO);
    void insertStudent(PerformanceTestVO performanceTestVO);
    void insertPerformanceRecord(PerformanceTestVO performanceTestVO);
    void updatePerformanceRecord(PerformanceTestVO performanceTestVO);
} 