export const fetchAcademyTestsAPI = async () => {
  const URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/performance-test/selectListAllPerformanceTest`;

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error("Server response error:", res.status);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
