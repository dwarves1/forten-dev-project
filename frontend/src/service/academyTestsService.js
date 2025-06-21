// 전체 테스트 리스트 가져오기
export const fetchAcademyTestsAPI = async () => {
  const URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/performance-test/selectListAllPerformanceTest`;

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error("Server response error:", res.status);
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 학생 리스트 가져오기
export const fetchStudentListAPI = async () => {
  const URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/performance-test/selectListAllStudent`;

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error("Server response error:", res.status);
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 학생 등록
export const createStudent = async (studentData) => {
  const URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/performance-test/insertStudent`;

  const formData = new FormData();
  const now = new Date();
  const fileName = `student_${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;

  formData.append("name", studentData.name);
  formData.append("gender", studentData.gender);
  formData.append("regionCode", studentData.district);
  formData.append("schoolCode", studentData.school);

  if (studentData.imgFile != null) {
    formData.append("imageFile", studentData.imgFile);
    formData.append("fileName", fileName);
  }

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// 테스트 기록 등록
export const createTestRecord = async (testData) => {
  const URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/performance-test/insertPerformanceRecord`;

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
  } catch (error) {
    console.log("Error creating test record:", error);
    throw error;
  }
};
