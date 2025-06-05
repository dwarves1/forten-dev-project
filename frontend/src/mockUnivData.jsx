// {
//     id: "",
//     univName: "", // 학교명
//     department: "", // 학과명
//     teacherCertification: "possible", // 교직이수여부
//     location: "seoul", // 위치
//     admissionType: {
// 수시
//       early: [
//         {
//           type: "", // 전형명
// 수능최저등급
//           minimumCsatGrades: {
//             value: false,
// subjects: [], // 과목
//             subjectCount: 0, // 과목개수
//             maxGradeSum: null, // 합
//             koreanHistory: { value: false }, // 한국사최저
//           },
//           recruitCount: "", // 모집인원
// 내신반영비율
//           academicGrades: {
//              total: 40, // 전체퍼센트
//              yearRatio: {
//                grade1: "", // 1학년
//                grade2: "", // 2학년
//                grade3: "", // 3학년
//              },
//              average: "", // 작년평균합격자등급
//              cutoff85: "", // 85%컷
//          },
//           practical: "", // 실기반영비율
//           etc: "", // 기타(면접 등)
//           note: "", // 비고
//         },
//       ],
// 정시
//       regular: [
//         {
//           type: "", // 전형명
//           recruitCount: "", // 모집인원
//           csat: "", // 수능반영비율
//           practical: "", // 실기반영비율
//           etc: "", // 기타
//           note: "", // 비고
//         },
// }

const mockUnivData = [
  {
    id: "catholic_gwandong_1",
    univName: "가톨릭관동대학교",
    department: "체육교육과",
    teacherCertification: "possible",
    location: "gangwon",
    admissionType: {
      early: [
        {
          type: "실기 일반",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "20",
          academicGrades: {
            total: "70",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.41",
            cutoff85: "2.49",
          },
          practical: "30",
          etc: "0",
          note: "",
        },
        {
          type: "학생부교과 농어촌",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "2",
          academicGrades: {
            total: "70",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.79",
            cutoff85: "2.85",
          },
          practical: "30",
          etc: "0",
          note: "",
        },
      ],
      regular: [],
    },
    events: [
      {
        eventName: "제자리멀리뛰기",
        unit: "m",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "10m 왕복달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "배구(월패스)",
        unit: "m",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "hanguk_1",
    univName: "한국대학교",
    department: "체육교육과",
    teacherCertification: "possible",
    location: "seoul",
    admissionType: {
      early: [
        {
          type: "실기전형",
          minimumCsatGrades: {
            value: true,
            subjects: ["korean", "english", "math", "exploration"],
            subjectCount: 2,
            maxGradeSum: 8,
            koreanHistory: { value: false },
          },
          recruitCount: "11",
          academicGrades: {
            total: "40",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.04",
            cutoff85: "2.33",
          },
          practical: "60",
          etc: "0",
          note: "국어, 수학, 탐구의 선택과목 제한 없음. 탐구 영역은 2과목 중 상위 1과목 반영",
        },
        {
          type: "농어촌학생전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "2",
          academicGrades: {
            total: "100",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.71",
            cutoff85: "2.74",
          },
          practical: "0",
          etc: "0",
          note: "일괄선발",
        },
      ],
      regular: [
        {
          type: "일반전형",
          recruitCount: "10",
          csat: "40",
          practical: "60",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "Z자 달리기",
        unit: "seconds",
        scoreTable: [
          { points: "150", male: "14.9 이하", female: "16.5 이하" },
          { points: "149", male: "15.0", female: "16.6" },
          { points: "148", male: "15.1", female: "16.7" },
          { points: "147", male: "15.2", female: "16.8" },
          { points: "146", male: "15.3", female: "16.9" },
          { points: "145", male: "15.4", female: "17.0" },
          { points: "144", male: "15.5", female: "17.1" },
          { points: "143", male: "15.6", female: "17.2" },
          { points: "142", male: "15.7", female: "17.3" },
          { points: "141", male: "15.8", female: "17.4" },
          { points: "140", male: "15.9", female: "17.5" },
          { points: "139", male: "16.0", female: "17.6" },
          { points: "138", male: "16.1", female: "17.7" },
          { points: "137", male: "16.2", female: "17.8" },
          { points: "136", male: "16.3", female: "17.9" },
          { points: "135", male: "16.4 이상", female: "18.0 이상" },
        ],
      },
      {
        eventName: "반복 옆 뛰기",
        unit: "counts",
        scoreTable: [
          { points: "150", male: "45 이상", female: "35 이상" },
          { points: "149", male: "44", female: "34" },
          { points: "148", male: "43", female: "33" },
          { points: "147", male: "42", female: "32" },
          { points: "146", male: "41", female: "31" },
          { points: "145", male: "40", female: "30" },
          { points: "144", male: "39", female: "29" },
          { points: "143", male: "38", female: "28" },
          { points: "142", male: "37", female: "27" },
          { points: "141", male: "36", female: "26" },
          { points: "140", male: "35", female: "25" },
          { points: "139", male: "34", female: "24" },
          { points: "138", male: "33", female: "23" },
          { points: "137", male: "32", female: "22" },
          { points: "136", male: "31", female: "21" },
          { points: "135", male: "30 이하", female: "20 이하" },
        ],
      },
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [
          { points: "150", male: "270 이상", female: "224 이상" },
          { points: "149", male: "267이상 270미만", female: "221이상 224미만" },
          { points: "148", male: "264이상 267미만", female: "218이상 221미만" },
          { points: "147", male: "261이상 264미만", female: "215이상 218미만" },
          { points: "146", male: "258이상 261미만", female: "212이상 215미만" },
          { points: "145", male: "255이상 258미만", female: "209이상 212미만" },
          { points: "144", male: "252이상 255미만", female: "206이상 209미만" },
          { points: "143", male: "249이상 252미만", female: "203이상 206미만" },
          { points: "142", male: "246이상 249미만", female: "200이상 203미만" },
          { points: "141", male: "243이상 246미만", female: "197이상 200미만" },
          { points: "140", male: "240이상 243미만", female: "194이상 197미만" },
          { points: "139", male: "237이상 240미만", female: "191이상 194미만" },
          { points: "138", male: "234이상 237미만", female: "188이상 191미만" },
          { points: "137", male: "231이상 234미만", female: "185이상 188미만" },
          { points: "136", male: "228이상 231미만", female: "182이상 185미만" },
          { points: "135", male: "228미만", female: "182미만" },
        ],
      },
      {
        eventName: "메디슨볼 던지기",
        unit: "m",
        scoreTable: [
          { points: "150", male: "10.0 이상", female: "7.0 이상" },
          { points: "149", male: "9.6 이상", female: "6.6 이상" },
          { points: "148", male: "9.2 이상", female: "6.2 이상" },
          { points: "147", male: "8.8 이상", female: "5.8 이상" },
          { points: "146", male: "8.4 이상", female: "5.4 이상" },
          { points: "145", male: "8.0 이상", female: "5.0 이상" },
          { points: "144", male: "7.6 이상", female: "4.6 이상" },
          { points: "143", male: "7.2 이상", female: "4.2 이상" },
          { points: "142", male: "6.8 이상", female: "3.8 이상" },
          { points: "141", male: "6.4 이상", female: "3.4 이상" },
          { points: "140", male: "6.0 이상", female: "3.0 이상" },
          { points: "139", male: "5.6 이상", female: "2.6 이상" },
          { points: "138", male: "5.2 이상", female: "2.2 이상" },
          { points: "137", male: "4.8 이상", female: "1.8 이상" },
          { points: "136", male: "4.4 이상", female: "1.4 이상" },
          { points: "135", male: "4.4 미만", female: "1.4 미만" },
        ],
      },
    ],
  },
  {
    id: "hanguk_2",
    univName: "한국대학교",
    department: "생활체육학과",
    teacherCertification: "impossible",
    location: "seoul",
    admissionType: {
      early: [
        {
          type: "농어촌학생전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "2",
          academicGrades: {
            total: "100",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "3.04",
            cutoff85: "3.33",
          },
          practical: "0",
          etc: "0",
          note: "일괄선발",
        },
        {
          type: "기회균형선발전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "1",
          academicGrades: {
            total: "100",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "3.36",
            cutoff85: "3.54",
          },
          practical: "0",
          etc: "0",
          note: "일괄선발",
        },
        {
          type: "실기전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "40",
          academicGrades: {
            total: "40",
            yearRatio: {
              grade1: "20",
              grade2: "50",
              grade3: "30",
            },
            average: "3.14",
            cutoff85: "3.28",
          },
          practical: "60",
          etc: "0",
          note: "일괄선발",
        },
      ],
      regular: [
        {
          type: "일반전형",
          recruitCount: "수시이월인원",
          csat: "40",
          practical: "60",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "Z자 달리기",
        unit: "seconds",
        scoreTable: [
          { points: "200", male: "14.9 이하", female: "16.5 이하" },
          { points: "198", male: "15.0", female: "16.6" },
          { points: "196", male: "15.1", female: "16.7" },
          { points: "194", male: "15.2", female: "16.8" },
          { points: "192", male: "15.3", female: "16.9" },
          { points: "190", male: "15.4", female: "17.0" },
          { points: "188", male: "15.5", female: "17.1" },
          { points: "186", male: "15.6", female: "17.2" },
          { points: "184", male: "15.7", female: "17.3" },
          { points: "182", male: "15.8", female: "17.4" },
          { points: "180", male: "15.9", female: "17.5" },
          { points: "178", male: "16.0", female: "17.6" },
          { points: "176", male: "16.1", female: "17.7" },
          { points: "174", male: "16.2", female: "17.8" },
          { points: "172", male: "16.3", female: "17.9" },
          { points: "170", male: "16.4 이상", female: "18.0 이상" },
        ],
      },
      {
        eventName: "옆으로 반복 뛰기",
        unit: "counts",
        scoreTable: [
          { points: "200", male: "45 이상", female: "35 이상" },
          { points: "198", male: "44", female: "34" },
          { points: "196", male: "43", female: "33" },
          { points: "194", male: "42", female: "32" },
          { points: "192", male: "41", female: "31" },
          { points: "190", male: "40", female: "30" },
          { points: "188", male: "39", female: "29" },
          { points: "186", male: "38", female: "28" },
          { points: "184", male: "37", female: "27" },
          { points: "182", male: "36", female: "26" },
          { points: "180", male: "35", female: "25" },
          { points: "178", male: "34", female: "24" },
          { points: "176", male: "33", female: "23" },
          { points: "174", male: "32", female: "22" },
          { points: "172", male: "31", female: "21" },
          { points: "170", male: "30 이하", female: "20 이하" },
        ],
      },
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [
          { points: "200", male: "270 이상", female: "224 이상" },
          { points: "198", male: "267이상 270미만", female: "221이상 224미만" },
          { points: "196", male: "264이상 267미만", female: "218이상 221미만" },
          { points: "194", male: "261이상 264미만", female: "215이상 218미만" },
          { points: "192", male: "258이상 261미만", female: "212이상 215미만" },
          { points: "190", male: "255이상 258미만", female: "209이상 212미만" },
          { points: "188", male: "252이상 255미만", female: "206이상 209미만" },
          { points: "186", male: "249이상 252미만", female: "203이상 206미만" },
          { points: "184", male: "246이상 249미만", female: "200이상 203미만" },
          { points: "182", male: "243이상 246미만", female: "197이상 200미만" },
          { points: "180", male: "240이상 243미만", female: "194이상 197미만" },
          { points: "178", male: "237이상 240미만", female: "191이상 194미만" },
          { points: "176", male: "234이상 237미만", female: "188이상 191미만" },
          { points: "174", male: "231이상 234미만", female: "185이상 188미만" },
          { points: "172", male: "228이상 231미만", female: "182이상 185미만" },
          { points: "170", male: "228미만", female: "182미만" },
        ],
      },
    ],
  },
  {
    id: "nazareth_1",
    univName: "나사렛대학교",
    department: "재활스포츠학부",
    teacherCertification: "impossible",
    location: "chungnam",
    admissionType: {
      early: [
        {
          type: "실기전형 일반학생",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "30",
          academicGrades: {
            total: "10",
            yearRatio: {
              grade1: "30",
              grade2: "35",
              grade3: "35",
            },
            average: "2.84",
            cutoff85: "3.01",
          },
          practical: "70",
          etc: "면접 20",
          note: "",
        },
      ],
      regular: [],
    },
    events: [
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "10m 왕복달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "윗몸일으키기",
        unit: "counts",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "daehan_1",
    univName: "대한대학교",
    department: "체육학과",
    teacherCertification: "possible",
    location: "ihcheon",
    admissionType: {
      early: [
        {
          type: "학생부종합 일반",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "10",
          academicGrades: {
            total: "80",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.28",
            cutoff85: "2.57",
          },
          practical: "0",
          etc: "면접 20",
          note: "",
        },
        {
          type: "실기전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "31",
          academicGrades: {
            total: "20",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "3.04",
            cutoff85: "3.33",
          },
          practical: "80",
          etc: "0",
          note: "",
        },
        {
          type: "농어촌전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "2",
          academicGrades: {
            total: "70",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
          },
          practical: "30",
          etc: "",
          note: "",
        },
      ],
      regular: [
        {
          type: "실기전형",
          recruitCount: "6",
          csat: "20",
          practical: "80",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "Z자 달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "제자리 멀리뛰기",
        unit: "cm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "daehan_2",
    univName: "대한대학교",
    department: "사회체육학과",
    teacherCertification: "impossible",
    location: "ihcheon",
    admissionType: {
      early: [
        {
          type: "학생부종합 일반",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "5",
          academicGrades: {
            total: "80",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "3.17",
            cutoff85: "3.42",
          },
          practical: "0",
          etc: "면접 20",
          note: "",
        },
        {
          type: "실기전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "26",
          academicGrades: {
            total: "20",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
          },
          practical: "80",
          etc: "0",
          note: "",
        },
      ],
      regular: [
        {
          type: "실기전형",
          recruitCount: "6",
          csat: "20",
          practical: "80",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "Z자 달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "제자리 멀리뛰기",
        unit: "cm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "daegu_1",
    univName: "대구대학교",
    department: "체육학과",
    teacherCertification: "impossible",
    location: "daegu",
    admissionType: {
      early: [
        {
          type: "실기/성적 예체능실기",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "39",
          academicGrades: {
            total: "20",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "4.98",
            cutoff85: "5.71",
          },
          practical: "80",
          etc: "0",
          note: "",
        },
      ],
      regular: [],
    },
    events: [
      {
        eventName: "Z자달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "daegu_2",
    univName: "대구대학교",
    department: "스포츠레저학과",
    teacherCertification: "impossible",
    location: "daegu",
    admissionType: {
      early: [
        {
          type: "실기/성적 예체능실기",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "34",
          academicGrades: {
            total: "20",
            yearRatio: {
              grade1: "35",
              grade2: "45",
              grade3: "20",
            },
            average: "5.01",
            cutoff85: "5.78",
          },
          practical: "80",
          etc: "0",
          note: "",
        },
      ],
      regular: [
        {
          type: "실기/실적 예체능실기",
          recruitCount: "3 + 수시미충원인원",
          csat: "20",
          practical: "80",
          etc: "",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "Z자달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "제자리멀리뛰기",
        unit: "sm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "메디신볼던지기",
        unit: "m",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "hanmain_1",
    univName: "한민대학교",
    department: "체육학부 체육학전공",
    teacherCertification: "possible",
    location: "chungnam",
    admissionType: {
      early: [
        {
          type: "실기 일반학생전형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "20",
          academicGrades: {
            total: "40",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.98",
            cutoff85: "3.71",
          },
          practical: "60",
          etc: "0",
          note: "",
        },
      ],
      regular: [
        {
          type: "수능위주",
          recruitCount: "15",
          csat: "60",
          practical: "40",
          etc: "0",
          note: "",
        },
        {
          type: "실기위주",
          recruitCount: "수시이월인원",
          csat: "20",
          practical: "80",
          etc: "",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [
          { points: "150", male: "280 이상", female: "230 이상" },
          {
            points: "147",
            male: "275 이상 ~ 280 미만",
            female: "225 이상 ~ 230 미만",
          },
          {
            points: "144",
            male: "270 이상 ~ 275 미만",
            female: "220 이상 ~ 225 미만",
          },
          {
            points: "141",
            male: "265 이상 ~ 270 미만",
            female: "215 이상 ~ 220 미만",
          },
          {
            points: "138",
            male: "260 이상 ~ 265 미만",
            female: "210 이상 ~ 215 미만",
          },
          {
            points: "135",
            male: "255 이상 ~ 260 미만",
            female: "205 이상 ~ 210 미만",
          },
          {
            points: "132",
            male: "250 이상 ~ 255 미만",
            female: "200 이상 ~ 205 미만",
          },
          {
            points: "129",
            male: "245 이상 ~ 250 미만",
            female: "195 이상 ~ 200 미만",
          },
          {
            points: "126",
            male: "240 이상 ~ 245 미만",
            female: "190 이상 ~ 195 미만",
          },
          {
            points: "123",
            male: "235 이상 ~ 240 미만",
            female: "185 이상 ~ 190 미만",
          },
          {
            points: "120",
            male: "230 이상 ~ 235 미만",
            female: "180 이상 ~ 185 미만",
          },
          {
            points: "117",
            male: "225 이상 ~ 230 미만",
            female: "175 이상 ~ 180 미만",
          },
          { points: "114", male: "225 미만", female: "175 미만" },
        ],
      },
      {
        eventName: "사이드스텝(회/20초)",
        unit: "counts",
        scoreTable: [
          { points: "150", male: "59 이상", female: "253 이상" },
          {
            points: "147",
            male: "57 ~ 58",
            female: "51 ~ 52",
          },
          {
            points: "144",
            male: "55 ~ 56",
            female: "49 ~ 50",
          },
          {
            points: "141",
            male: "53 ~ 54",
            female: "47 ~ 48",
          },
          {
            points: "138",
            male: "51 ~ 52",
            female: "45 ~ 46",
          },
          {
            points: "135",
            male: "49 ~ 50",
            female: "43 ~ 44",
          },
          {
            points: "132",
            male: "47 ~ 78",
            female: "41 ~ 42",
          },
          {
            points: "129",
            male: "45 ~ 46",
            female: "39 ~ 40",
          },
          {
            points: "126",
            male: "43 ~ 44",
            female: "37 ~ 38",
          },
          {
            points: "123",
            male: "41 ~ 42",
            female: "35 ~ 36",
          },
          {
            points: "120",
            male: "39 ~ 40",
            female: "33 ~ 34",
          },
          {
            points: "117",
            male: "37 ~ 38",
            female: "31 ~ 32",
          },
          { points: "114", male: "36 이하", female: "30 이하" },
        ],
      },
      {
        eventName: "농구 레이업슛",
        unit: "counts",
        scoreTable: [
          { points: "150", male: "15 이상", female: "11 이상" },
          {
            points: "147",
            male: "14",
            female: "10",
          },
          {
            points: "144",
            male: "13",
            female: "9",
          },
          {
            points: "141",
            male: "12",
            female: "8",
          },
          {
            points: "138",
            male: "11",
            female: "7",
          },
          {
            points: "135",
            male: "10",
            female: "6",
          },
          {
            points: "132",
            male: "9",
            female: "5",
          },
          {
            points: "129",
            male: "8",
            female: "4",
          },
          {
            points: "126",
            male: "7",
            female: "3",
          },
          {
            points: "123",
            male: "6",
            female: "2",
          },
          {
            points: "120",
            male: "5",
            female: "1 이하",
          },
          {
            points: "117",
            male: "4",
            female: "-",
          },
          { points: "114", male: "3 이하", female: "-" },
        ],
      },
    ],
  },
  {
    id: "busan_1",
    univName: "부산대학교",
    department: "체육교육과",
    teacherCertification: "possible",
    location: "busan",
    admissionType: {
      early: [
        {
          type: "실기/실적 실기",
          minimumCsatGrades: {
            value: true,
            subjects: ["korean", "english", "math", "exploration"],
            subjectCount: 2,
            maxGradeSum: 6,
            koreanHistory: { value: true, grade: 4 },
          },

          recruitCount: "15",
          academicGrades: {
            total: "40",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.18",
            cutoff85: "3.05",
          },
          practical: "60",
          etc: "0",
          note: "",
        },
        {
          type: "실기/실적 농어촌 학생",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: true, grade: 5 },
          },
          recruitCount: "1",
          academicGrades: {
            total: "60",
            yearRatio: {
              grade1: "40",
              grade2: "40",
              grade3: "20",
            },
            average: "2.54",
            cutoff85: "3.11",
          },
          practical: "40",
          etc: "0",
          note: "",
        },
        {
          type: "실기/실적 저소득층 학생",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "1",
          academicGrades: {
            total: "60",
            yearRatio: {
              grade1: "40",
              grade2: "40",
              grade3: "20",
            },
            average: "2.68",
            cutoff85: "3.21",
          },
          practical: "40",
          etc: "0",
          note: "",
        },
      ],
      regular: [],
    },
    events: [
      {
        eventName: "지그재그런",
        unit: "seconds",
        scoreTable: [
          { points: "15", male: "14.40 이내", female: "15.80 이내" },
          { points: "14", male: "14.41 ~ 14.60", female: "15.81 ~ 16.00" },
          { points: "13", male: "14.61 ~ 14.80", female: "16.01 ~ 16.20" },
          { points: "12", male: "14.81 ~ 15.00", female: "16.21 ~ 16.40" },
          { points: "11", male: "15.01 ~ 15.20", female: "16.41 ~ 16.60" },
          { points: "10", male: "15.21 ~ 15.40", female: "16.61 ~ 16.80" },
          { points: "9", male: "15.41 ~ 15.60", female: "16.81 ~ 17.00" },
          { points: "8", male: "15.61 ~ 15.80", female: "17.01 ~ 17.20" },
          { points: "7", male: "15.81 ~ 16.00", female: "17.21 ~ 17.40" },
          { points: "6", male: "16.01 ~ 16.20", female: "17.41 ~ 17.60" },
          { points: "5", male: "16.21 ~ 16.40", female: "17.61 ~ 17.80" },
          { points: "4", male: "16.40 초과", female: "17.80 초과" },
        ],
      },
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [
          { points: "15", male: "278 이상", female: "228 이상" },
          { points: "14", male: "277 ~ 275", female: "227 ~ 225" },
          { points: "13", male: "274 ~ 272", female: "224 ~ 222" },
          { points: "12", male: "271 ~ 269", female: "221 ~ 219" },
          { points: "11", male: "268 ~ 266", female: "218 ~ 216" },
          { points: "10", male: "265 ~ 263", female: "215 ~ 213" },
          { points: "9", male: "262 ~ 260", female: "212 ~ 210" },
          { points: "8", male: "259 ~ 257", female: "209 ~ 207" },
          { points: "7", male: "256 ~ 254", female: "206 ~ 204" },
          { points: "6", male: "253 ~ 251", female: "203 ~ 201" },
          { points: "5", male: "250 ~ 248", female: "200 ~ 198" },
          { points: "4", male: "247 이하", female: "197 이하" },
        ],
      },
    ],
  },
  {
    id: "kookmin_1",
    univName: "국민대학교",
    department: "스포츠교육학과",
    teacherCertification: "conditionally",
    location: "kyungbuk",
    admissionType: {
      early: [],
      regular: [
        {
          type: "일반 실기전형",
          recruitCount: "20",
          csat: "40",
          practical: "40",
          etc: "학생부교과 20",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "200m 왕복 달리기",
        unit: "seconds",
        scoreTable: [
          { points: "100", male: "13.40 이내", female: "15.00 이내" },
          { points: "95", male: "13.41 ~ 13. 60", female: "15.01 ~ 15.20" },
          { points: "90", male: "13.61 ~ 13.80", female: "15.21 ~ 15.40" },
          { points: "85", male: "13.81 ~ 14.00", female: "15.41 ~ 15.60" },
          { points: "80", male: "14.01 ~ 14.20", female: "15.61 ~ 15.80" },
          { points: "75", male: "14.21 ~ 14.40", female: "15.81 ~ 16.00" },
          { points: "70", male: "14.41 ~ 14.60", female: "16.01 ~ 16.20" },
          { points: "65", male: "14.61 ~ 14.80", female: "16.21 ~ 16.40" },
          { points: "60", male: "14.81 ~ 15.00", female: "16.41 ~ 16.60" },
          { points: "55", male: "15.01 ~ 15.20", female: "16.61 ~ 16.80" },
          { points: "50", male: "15.21 ~ 15.40", female: "16.81 ~ 17.00" },
          { points: "45", male: "15.41 ~ 15.60", female: "17.01 ~ 17.20" },
          { points: "40", male: "15.61 ~ 15.80", female: "17.21 ~ 17.40" },
          { points: "35", male: "15.81 이상", female: "17.41 이상" },
        ],
      },
      {
        eventName: "제자리 멀리뛰기(cm)",
        unit: "cm",
        scoreTable: [
          { points: "100", male: "285 이상", female: "235 이상" },
          { points: "95", male: "284 ~ 280", female: "234 ~ 230" },
          { points: "90", male: "279 ~ 275", female: "229 ~ 225" },
          { points: "85", male: "274 ~ 270", female: "224 ~ 220" },
          { points: "80", male: "269 ~ 265", female: "219 ~ 215" },
          { points: "75", male: "264 ~ 260", female: "241 ~ 210" },
          { points: "70", male: "259 ~ 255", female: "209 ~ 205" },
          { points: "65", male: "254 ~ 250", female: "204 ~ 200" },
          { points: "60", male: "249 ~ 245", female: "199 ~ 195" },
          { points: "55", male: "244 ~ 240", female: "194 ~ 190" },
          { points: "50", male: "239 ~ 235", female: "189 ~ 185" },
          { points: "45", male: "234 ~ 230", female: "184 ~ 180" },
          { points: "40", male: "229 ~ 225", female: "179 ~ 175" },
          { points: "35", male: "224 이하", female: "174 이하" },
        ],
      },
      {
        eventName: "윗몸일으키기",
        unit: "counts",
        scoreTable: [
          { points: "100", male: "77 이상", female: "73 이상" },
          { points: "95", male: "76", female: "72" },
          { points: "90", male: "75", female: "71" },
          { points: "85", male: "74", female: "70" },
          { points: "80", male: "73", female: "69" },
          { points: "75", male: "72 ~ 71", female: "68 ~ 67" },
          { points: "70", male: "70 ~ 69", female: "66 ~ 65" },
          { points: "65", male: "68 ~ 67", female: "64 ~ 63" },
          { points: "60", male: "66 ~ 64", female: "62 ~ 60" },
          { points: "55", male: "63 ~ 61", female: "59 ~ 57" },
          { points: "50", male: "60 ~ 58", female: "56 ~ 54" },
          { points: "45", male: "57 ~ 54", female: "53 ~ 50" },
          { points: "40", male: "53 ~ 50", female: "49 ~ 46" },
          { points: "35", male: "45 이하", female: "49 이하" },
        ],
      },
      {
        eventName: "메디신볼 던지기",
        unit: "m",
        scoreTable: [
          { points: "100", male: "12.0 이상", female: "10.0 이상" },
          { points: "95", male: "11.9 ~ 11.8", female: "9.9 ~ 9.8" },
          { points: "90", male: "11.7 ~ 11.6", female: "9.7 ~ 9.6" },
          { points: "85", male: "11.5 ~ 11.4", female: "9.5 ~ 9.4" },
          { points: "80", male: "11.3 ~ 11.2", female: "9.3 ~ 9.2" },
          { points: "75", male: "11.1 ~ 11.0", female: "9.1 ~ 9.0" },
          { points: "70", male: "10.9 ~ 10.8", female: "8.9 ~ 8.8" },
          { points: "65", male: "10.7 ~ 10.6", female: "8.7 ~ 8.6" },
          { points: "60", male: "10.5 ~ 10.4", female: "8.5 ~ 8.4" },
          { points: "55", male: "10.3 ~ 10.2", female: "8.3 ~ 8.2" },
          { points: "50", male: "10.1 ~ 10.0", female: "8.1 ~ 8.0" },
          { points: "45", male: "9.9 ~ 9.8", female: "7.9 ~ 7.8" },
          { points: "40", male: "9.7 ~ 9.6", female: "7.7 ~ 7.6" },
          { points: "30", male: "9.5 이하", female: "7.5 이하" },
        ],
      },
    ],
  },
  {
    id: "minkook_1",
    univName: "민국대학교",
    department: "체육교육과",
    teacherCertification: "possible",
    location: "busan",
    admissionType: {
      early: [
        {
          type: "학생부교과 지역균형선발",
          minimumCsatGrades: {
            value: false,
            subjects: ["korean", "english", "math", "exploration"],
            subjectCount: 2,
            maxGradeSum: 6,
            koreanHistory: { value: false },
          },
          recruitCount: "10",
          academicGrades: {
            total: "70",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.48",
            cutoff85: "3.11",
          },
          practical: "30",
          etc: "",
          note: "<수능최저학력기준> \n - 수학 (확통/미적분/기하) \n - 탐구(사탐/과탐 중 1개 과목)",
        },
      ],
      regular: [
        {
          type: "수능위주",
          recruitCount: "30",
          csat: "70",
          practical: "30",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "왕복달리기",
        unit: "seconds",
        scoreTable: [
          { points: "100", male: "9.90 이하", female: "11.00 이하" },
          { points: "92", male: "9.91 ~ 10.11", female: "11.01 ~ 11.21" },
          { points: "84", male: "10.12 ~ 10.31", female: "11.22 ~ 11.41" },
          { points: "76", male: "10.32 ~ 10.51", female: "11.42 ~ 11.61" },
          { points: "68", male: "10.52 ~ 10.71", female: "11.62 ~ 11.81" },
          { points: "60", male: "10.72 ~ 10.91", female: "11.82 ~ 12.01" },
          { points: "52", male: "10.92 ~ 11.11", female: "12.02 ~ 12.21" },
          { points: "44", male: "11.12 ~ 11.31", female: "12.22 ~ 12.41" },
          { points: "36", male: "11.32 ~ 11.51", female: "12.42 ~ 12.61" },
          { points: "20", male: "실격", female: "실격" },
        ],
      },
      {
        eventName: "높이뛰기",
        unit: "cm",
        scoreTable: [
          { points: "100", male: "155 이상", female: "125 이상" },
          { points: "92", male: "150", female: "120" },
          { points: "84", male: "145", female: "115" },
          { points: "76", male: "140", female: "110" },
          { points: "68", male: "135", female: "105" },
          { points: "60", male: "130", female: "100" },
          { points: "52", male: "125", female: "95" },
          { points: "44", male: "120", female: "90" },
          { points: "36", male: "115", female: "85" },
          { points: "20", male: "실격", female: "실격" },
        ],
      },
    ],
  },
  {
    id: "mokwon_1",
    univName: "목원대학교",
    department: "스포츠건강관리학과",
    teacherCertification: "impossible",
    location: "daejeon",
    admissionType: {
      early: [
        {
          type: "실기/실적위주 일반학생",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: null,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "53",
          academicGrades: {
            total: "40",
            yearRatio: {
              grade1: "30",
              grade2: "30",
              grade3: "40",
            },
            average: "4.33",
            cutoff85: "5.68",
          },
          practical: "60",
          etc: "0",
          note: "",
        },
      ],
      regular: [],
    },
    events: [
      {
        eventName: "제자리멀리뛰기",
        unit: "cm",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
      {
        eventName: "10m왕복달리기",
        unit: "seconds",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "chungang_1",
    univName: "중앙대학교",
    department: "스포츠과학부 생활·레져스포츠,스포츠산업",
    teacherCertification: "impossible",
    location: "gyeonggi",
    admissionType: {
      early: [],
      regular: [
        {
          type: "수능 실기형",
          recruitCount: "52",
          csat: "60",
          practical: "40",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "100m 달리기",
        unit: "seconds",
        scoreTable: [
          { points: "34", male: "11.5 이하", female: "13.5 이하" },
          { points: "33", male: "11.51 ~ 11.6", female: "13.51 ~ 13.6" },
          { points: "32", male: "11.61 ~ 11.7", female: "13.61 ~ 13.7" },
          { points: "31", male: "11.71 ~ 11.8", female: "13.71 ~ 13.8" },
          { points: "30", male: "11.81 ~ 11.9", female: "13.81 ~ 13.9" },
          { points: "29", male: "11.91 ~ 12.0", female: "13.91 ~ 14.0" },
          { points: "28", male: "12.01 ~ 12.1", female: "14.01 ~ 14.1" },
          { points: "27", male: "12.11 ~ 12.2", female: "14.11 ~ 14.2" },
          { points: "26", male: "12.21 ~ 12.3", female: "14.21 ~ 14.3" },
          { points: "27", male: "12.31 ~ 12.4", female: "14.31 ~ 14.4" },
          { points: "26", male: "12.41 ~ 12.5", female: "14.41 ~ 14.5" },
          { points: "25", male: "12.51 이상", female: "14.51 이상" },
        ],
      },
      {
        eventName: "메디신볼 던지기",
        unit: "m",
        scoreTable: [
          { points: "33", male: "12.0 이상", female: "9.0 이상" },
          { points: "32", male: "11.8 ~ 11.9", female: "8.8 ~ 8.9" },
          { points: "31", male: "11.6 ~ 11.7", female: "8.6 ~ 8.7" },
          { points: "30", male: "11.4 ~ 11.5", female: "8.4 ~ 8.5" },
          { points: "29", male: "11.2 ~ 11.3", female: "8.2 ~ 8.3" },
          { points: "28", male: "11.0 ~ 11.1", female: "8.0 ~ 8.1" },
          { points: "27", male: "10.8 ~ 10.9", female: "7.8 ~ 7.9" },
          { points: "26", male: "10.6 ~ 10.7", female: "7.6 ~ 7.7" },
          { points: "25", male: "10.4 ~ 10.5", female: "7.4 ~ 7.5" },
          { points: "24", male: "10.2 ~ 10.3", female: "7.2 ~ 7.3" },
          { points: "23", male: "10.0 ~ 10.1", female: "7.0 ~ 7.1" },
          { points: "22", male: "10.1 미만", female: "7.1 미만" },
        ],
      },
    ],
  },
  {
    id: "hanyang_1",
    univName: "한양대학교",
    department: "스포츠산업과학부 스포츠사이언스",
    teacherCertification: "conditionally",
    location: "seoul",
    admissionType: {
      early: [
        {
          type: "학생부종합 서류형",
          minimumCsatGrades: {
            value: false,
            subjects: [],
            subjectCount: 0,
            maxGradeSum: null,
            koreanHistory: { value: false },
          },
          recruitCount: "6",
          academicGrades: {
            total: "70",
            yearRatio: {
              grade1: "30",
              grade2: "40",
              grade3: "30",
            },
            average: "2.08",
            cutoff85: "2.71",
          },
          practical: "30",
          etc: "0",
          note: "",
        },
      ],
      regular: [
        {
          type: "수능일반",
          recruitCount: "18",
          csat: "70",
          practical: "30",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "30m 달리기 후 사이드스텝 15회 & 모래주머니 들고 달리기",
        unit: "seconds",
        scoreTable: [
          { points: "300", male: "22초50 이내", female: "24초50 이내" },
          { points: "295", male: "22초51-23초00", female: "24초51-25초00" },
          { points: "290", male: "23초01-23초50", female: "25초01-25초50" },
          { points: "285", male: "23초51-24초00", female: "25초51-26초00" },
          { points: "280", male: "24초01-24초50", female: "26초01-26초50" },
          { points: "275", male: "24초51-25초00", female: "26초51-27초00" },
          { points: "270", male: "25초01-25초50", female: "27초01-27초50" },
          { points: "265", male: "25초51-26초00", female: "27초51-28초00" },
          { points: "260", male: "26초01-26초50", female: "28초01-28초50" },
          { points: "255", male: "26초51-27초00", female: "28초51-29초00" },
          { points: "250", male: "27초01-27초50", female: "29초01-29초50" },
        ],
      },
    ],
  },
  {
    id: "daekook_1",
    univName: "대국대학교",
    department: "스포츠과학과",
    teacherCertification: "impossible",
    location: "seoul",
    admissionType: {
      early: [],
      regular: [
        {
          type: "수능위주",
          recruitCount: "22",
          csat: "80",
          practical: "20",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "",
        unit: "",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
  {
    id: "tamla_1",
    univName: "탐라대학교",
    department: "체육교육과",
    teacherCertification: "possible",
    location: "jeju",
    admissionType: {
      early: [],
      regular: [
        {
          type: "실기위주",
          recruitCount: "25",
          csat: "70",
          practical: "30",
          etc: "0",
          note: "",
        },
      ],
    },
    events: [
      {
        eventName: "",
        unit: "",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  },
];

export default mockUnivData;
