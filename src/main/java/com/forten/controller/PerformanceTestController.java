package com.forten.controller;

import com.forten.service.PerformanceTestService;
import com.forten.vo.PerformanceTestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
}
