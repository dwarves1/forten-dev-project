# Forten Project

반응형 웹 애플리케이션 프로젝트입니다.

## 기술 스택

### 백엔드
- Java 17
- Spring Boot 3.2.3
- PostgreSQL
- Apache Tomcat (내장)
- Maven

### 프론트엔드
- React 18
- Axios
- CSS3 (반응형 디자인)

## 시작하기

### 데이터베이스 설정
1. PostgreSQL을 설치하고 실행합니다.
2. `forten` 데이터베이스를 생성합니다.
3. `application.properties` 파일에서 데이터베이스 접속 정보를 수정합니다.

### 백엔드 실행
```bash
cd forten
mvn spring-boot:run
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start
npm run dev
```

## 접속 정보
- 백엔드 서버: http://localhost:8080
- 프론트엔드 개발 서버: http://localhost:3000 , http://localhost:5173