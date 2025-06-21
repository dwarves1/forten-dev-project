package com.forten.vo;

import lombok.Data;
import java.math.BigDecimal;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PerformanceTestVO {
    private String codeGroup;
    private String code;
    private String codeName;

    private String studentCode;
    private String name;
    private String gender;
    private String schoolCodeGroup;
    private String schoolCode;
    private String regionCodeGroup;
    private String regionCode;

    private String eventCode;
    private String eventName;
    private String unit;

    private String recordYm;
    private BigDecimal score;

    private String createdAt;
    private String createdBy;
    private String updatedAt;
    private String updatedBy;

    private BigDecimal pfJump; 
    private BigDecimal pfSitup;
    private BigDecimal pfZrun;
    private BigDecimal pfMedicine;
    private BigDecimal pfSprint100;
    private BigDecimal pfFlex;
    private BigDecimal pfThrow;
    private BigDecimal pfBack;
    private BigDecimal pfShuttle10;
    private BigDecimal pfShuttle20;

    private String imageSrc;
    private String fileName;
    private MultipartFile imageFile;

}