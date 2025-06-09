// 성별 변환 함수
export const normalizeGender = (genderKorean) => {
  if (genderKorean === "여") return "female";
  if (genderKorean === "남") return "male";
  return "unknown";
};

// 테스트종목명 변환 함수
export const testNameList = [
  { code: "pfJump", label: "제자리멀리뛰기" },
  { code: "pfBack", label: "배근력" },
  { code: "pfFlex", label: "유연성(좌전굴)" },
  { code: "pfMedicine", label: "메디신볼" },
  { code: "pfShuttle10", label: "10M왕복" },
  { code: "pfShuttle20", label: "20M왕복" },
  { code: "pfSitup", label: "윗몸일으키기" },
  { code: "pfSprint100", label: "100M달리기" },
  { code: "pfThrow", label: "던지기" },
  { code: "pfZrun", label: "Z-런달리기" },
];

export const getTestNameInKorean = (testCode) => {
  const item = testNameList.find((item) => item.code === testCode);
  return item ? item.label : testCode;
};

export const formatYearMonth = (recordYm) => {
  const str = recordYm.toString();

  return str.slice(0, 4) + "-" + str.slice(4, 6);
};
