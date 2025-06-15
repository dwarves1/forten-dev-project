package com.forten.controller;

import com.forten.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/excel")
@RequiredArgsConstructor
public class ExcelController {
    private final ExcelService excelService;
    
    @PostMapping("/performaceTestUpload")
    public ResponseEntity<String> performaceTestUpload(@RequestParam("file") MultipartFile file) {
        try {
            excelService.performaceTestUpload(file);
            return ResponseEntity.ok("엑셀 파일 업로드가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("파일 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
} 