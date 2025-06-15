package com.forten.vo;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ExcelDataVO {
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

    private String createdAt;
    private String createdBy;
    private String updatedAt;
    private String updatedBy;

    private String pfName;
    private BigDecimal score;
} 