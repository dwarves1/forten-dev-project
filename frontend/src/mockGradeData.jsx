const mockGradeData = [
  {
    type: "academic",
    title: "교과 성적",
    item: [
      {
        title: "1학년 1학기",
        subjects: [
          { name: "국어", score: 85 },
          { name: "수학", score: 90 },
          { name: "영어", score: 70 },
        ],
      },
      {
        title: "1학년 2학기",
        subjects: [
          { name: "국어", score: 80 },
          { name: "수학", score: 95 },
          { name: "영어", score: 80 },
        ],
      },
    ],
  },
  {
    type: "mocktest",
    title: "모의고사 성적",
    item: [
      {
        title: "3월 모의고사",
        subjects: [
          { name: "국어", score: 75 },
          { name: "수학", score: 85 },
          { name: "영어", score: 75 },
        ],
      },
      {
        title: "4월 사설모의고사",
        subjects: [
          { name: "국어", score: 80 },
          { name: "수학", score: 95 },
          { name: "영어", score: 85 },
        ],
      },
    ],
  },
  {
    type: "csat",
    title: "수능 성적",
    item: [
      {
        title: "2025학년도 수능",
        subjects: [
          { name: "국어", score: 85 },
          { name: "수학", score: 90 },
          { name: "영어", score: 85 },
        ],
      },
    ],
  },
];

export default mockGradeData;
