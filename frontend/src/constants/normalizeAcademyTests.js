import { getScore } from "./scores";
import { formatYearMonth, normalizeGender } from "./utils";

export const normalizeAcademyTest = (rows) => {
  const peopleMap = new Map();

  rows.forEach((row) => {
    const {
      studentCode,
      name,
      gender,
      regionCode,
      schoolCode,
      recordYm,
      ...rest
    } = row;

    const genderEng = normalizeGender(gender);
    const formattedYm = formatYearMonth(recordYm);

    if (!peopleMap.has(studentCode)) {
      peopleMap.set(studentCode, {
        studentCode,
        name,
        gender: genderEng,
        district: regionCode,
        school: schoolCode,
        monthlyTests: {},
      });
    }

    const person = peopleMap.get(studentCode);

    if (!person.monthlyTests[formattedYm]) {
      person.monthlyTests[formattedYm] = { tests: [] };
    }

    const currentMonth = person.monthlyTests[formattedYm];

    Object.entries(rest).forEach(([key, value]) => {
      if (typeof value === "number" && key.startsWith("pf")) {
        const score = getScore(key, genderEng, value);
        currentMonth.tests.push({
          name: key,
          record: value,
          score: score,
        });
      }
    });

    currentMonth.totalScore = currentMonth.tests.reduce(
      (sum, test) => sum + test.score,
      0
    );
  });

  return Array.from(peopleMap.values());
};
