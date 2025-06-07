package com.forten.service;

import com.forten.mapper.PerformanceTestMapper;
import com.forten.vo.PerformanceTestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PerformanceTestService {
    
    @Autowired
    private PerformanceTestMapper performanceTestMapper;
    
    public List<PerformanceTestVO> selectListAllPerformanceTest(PerformanceTestVO performanceTestVO) {
        return performanceTestMapper.selectListAllPerformanceTest(performanceTestVO);
    }
} 