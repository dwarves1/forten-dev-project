package com.forten.controller;

import com.forten.service.PerformanceTestService;
import com.forten.vo.PerformanceTestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

/**
| 어노테이션                         | 설명                                            |
| ----------------------------- | --------------------------------------------- |
| `@RestController`             | JSON 형태로 응답하는 컨트롤러 (기본 응답은 @ResponseBody 포함됨) |
| `@RequestMapping("/api/xxx")` | 이 컨트롤러가 처리할 URL 경로 지정 (공통 prefix)             |

| 어노테이션                    | HTTP 메서드 | 설명           |
| ------------------------    | -------- | ------------ |
| `@GetMapping("/목록")`       | GET      | 데이터 조회용      |
| `@PostMapping("/등록")`      | POST     | 새 데이터 등록     |
| `@PutMapping("/수정")`       | PUT      | 기존 데이터 전체 수정 |
| `@PatchMapping("/일부수정")`  | PATCH    | 데이터 일부 수정    |
| `@DeleteMapping("/삭제")`    | DELETE   | 데이터 삭제       |

| 어노테이션                  | 용도                                         |
| ---------------------- | ------------------------------------------ |
| `@RequestParam`        | 쿼리 파라미터 (e.g. `/api/user?id=123`)          |
| `@PathVariable`        | URL 경로 변수 (e.g. `/api/user/123`)           |
| `@RequestBody`         | JSON 요청 본문 데이터를 객체로 매핑 (POST, PUT에서 주로 사용) |
| `@ModelAttribute`      | 폼(form) 데이터 바인딩                            |
| `@RequestHeader`       | HTTP 헤더 값 추출                               |
| `@Validated`, `@Valid` | 입력값 검증용                                    |
 */

@RestController
@RequestMapping("/api/performance-test")
public class PerformanceTestController {

    @Autowired
    private PerformanceTestService performanceTestService;

    @GetMapping("/selectListAllPerformanceTest")
    public List<PerformanceTestVO> selectListAllPerformanceTest(@ModelAttribute PerformanceTestVO performanceTestVO) {
        return performanceTestService.selectListAllPerformanceTest(performanceTestVO);
    }

    @GetMapping("/selectListAllStudent")
    public List<PerformanceTestVO> selectListAllStudent(@ModelAttribute PerformanceTestVO performanceTestVO) {
        return performanceTestService.selectListAllStudent(performanceTestVO);
    }

    @PostMapping("/insertStudent")
    public ResponseEntity<Map<String, Object>> insertStudent(
        @ModelAttribute PerformanceTestVO performanceTestVO) {
            try {
                performanceTestService.insertStudent(performanceTestVO);

                Map<String, Object> result = new HashMap<>();
                result.put("message", "학생 등록이 완료되었습니다.");
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } catch (RuntimeException error) {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "학생 등록 실패"); 

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
            }
    }

    @PostMapping("/insertPerformanceRecord")
    public ResponseEntity<Map<String, Object>> insertPerformanceRecord(@RequestBody PerformanceTestVO performanceTestVO) {
        try {
            performanceTestService.insertPerformanceRecord(performanceTestVO);

            Map<String, Object> result = new HashMap<>();
            result.put("message", "테스트 기록 저장이 완료되었습니다.");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException error) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "테스트 기록 저장 실패"); 

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }
}
