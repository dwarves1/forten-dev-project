package com.forten.mapper;

import com.forten.vo.PerformanceTestVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PerformanceTestMapper {
    List<PerformanceTestVO> selectListAllPerformanceTest(PerformanceTestVO performanceTestVO);
} 