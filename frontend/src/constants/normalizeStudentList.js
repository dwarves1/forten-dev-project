import { normalizeGender } from "./utils";

export const normalizeStudentList = (students) => {
  const studentMap = new Map();

  students.forEach((student) => {
    const { name, studentCode, gender, regionCode, schoolCode, imageSrc } =
      student;

    const genderEng = normalizeGender(gender);

    if (!studentMap.has(studentCode)) {
      studentMap.set(studentCode, {
        studentCode,
        name,
        imageSrc,
        gender: genderEng,
        district: regionCode,
        school: schoolCode,
      });
    }
  });

  return Array.from(studentMap.values());
};
