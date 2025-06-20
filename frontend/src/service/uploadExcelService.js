export const uploadExcelFile = async (file) => {
  const URL = `${import.meta.env.VITE_API_BASE_URL}/api/excel/upload`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
  } catch (error) {
    console.log("Error uploading excel file:", error);
    throw error;
  }
};
