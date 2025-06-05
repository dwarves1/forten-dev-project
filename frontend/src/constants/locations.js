export const LOCATION = [
  { location: "서울", value: "seoul" },
  { location: "인천", value: "incheon" },
  { location: "대구", value: "daegu" },
  { location: "부산", value: "busan" },
  { location: "울산", value: "ulsan" },
  { location: "광주", value: "gwangju" },
  { location: "경기", value: "gyeonggi" },
  { location: "강원", value: "gangwon" },
  { location: "충북", value: "chungbuk" },
  { location: "충남", value: "chungnam" },
  { location: "대전", value: "daejeon" },
  { location: "전북", value: "jeonbuk" },
  { location: "전남", value: "jeonnam" },
  { location: "경북", value: "kyungbuk" },
  { location: "경남", value: "kyungnam" },
  { location: "제주", value: "jeju" },
];

export const LOCATION_MAP = Object.fromEntries(
  LOCATION.map(({ value, location }) => [value, location])
);
