import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockGradeData from "../mockGradeData";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import MainLayout from "../components/layouts/MainLayout";
import WideBtn from "../components/ui/WideBtn";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function Grades() {
  const { studentId } = useParams(); // URL에서 학생 ID 가져오기
  const navigate = useNavigate();

  // 예제 학생 정보 (API 연동 필요)
  const student = {
    id: studentId,
    name: "이서연",
    birthdate: "2007-03-22",
    school: "서울여자고등학교",
    grade: "1학년",
  };

  // 데이터
  const [grades, setGrades] = useState(mockGradeData);

  // 성적 유형 선택
  const [selectedCategory, setSelectedCategory] = useState(grades[0].type);

  // 선택한 카테고리 데이터
  const selectedCategoryData = useMemo(
    () => grades.find((category) => category.type === selectedCategory),
    [grades, selectedCategory]
  );
  // 수정 모드
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    if (editMode) {
      window.alert("저장되었습니다");
    }
    setEditMode(!editMode);
  };

  const handleAddItem = () => {
    const newCategory = {
      title: "",
      subjects: [
        { name: "", score: "" },
        { name: "", score: "" },
        { name: "", score: "" },
      ],
    };

    // 상태 업데이트: 해당 카테고리의 item 배열에 새로운 항목을 추가
    const updatedGrades = grades.map((category) => {
      if (category.type === selectedCategory) {
        return {
          ...category,
          item: [...category.item, newCategory], // 새 항목 추가
        };
      }
      return category;
    });

    setGrades(updatedGrades);
  };

  const handleAddScore = (itemTitle) => {
    const newSubject = {
      name: "",
      score: "",
    };

    const updatedGrades = grades.map((category) => {
      if (category.type === selectedCategory) {
        const updatedItems = category.item.map((item) => {
          if (item.title === itemTitle) {
            return {
              ...item,
              subjects: [...item.subjects, newSubject], // 새 과목 추가
            };
          }
          return item;
        });
        return {
          ...category,
          item: updatedItems, // 수정된 항목 배열로 업데이트
        };
      }
      return category;
    });

    // 상태 업데이트
    setGrades(updatedGrades);
  };

  const handleDeleteLi = (itemTitle, itemIndex) => {
    if (window.confirm("이 과목을 삭제할까요?")) {
      setGrades((prev) =>
        prev.map((category) =>
          category.type === selectedCategory
            ? {
                ...category,
                item: category.item.map((item) =>
                  item.title === itemTitle
                    ? {
                        ...item,
                        subjects: item.subjects.filter(
                          (_, index) => index !== itemIndex
                        ),
                      }
                    : item
                ),
              }
            : category
        )
      );
    }
  };

  const handleDeleteItem = (itemIndex) => {
    if (window.confirm("이 카테고리를 삭제할까요?")) {
      setGrades((prev) =>
        prev.map((category) =>
          category.type === selectedCategory
            ? {
                ...category,
                item: category.item.filter((_, index) => index !== itemIndex),
              }
            : category
        )
      );
    }
  };

  // 아이템명 title(ex-1학년1학기) 변경 함수
  const handleItemTitleChange = (value, dataIndex) => {
    setGrades((prev) =>
      prev.map((category) =>
        category.type === selectedCategory
          ? {
              ...category,
              item: category.item.map((item, index) =>
                index === dataIndex ? { ...item, title: value } : item
              ),
            }
          : category
      )
    );
  };

  // 아이템 subjects 변경 함수
  const handleSubjectChange = (dataIndex, itemIndex, value, field) => {
    setGrades((prev) =>
      prev.map((category) =>
        category.type === selectedCategory
          ? {
              ...category,
              item: category.item.map((item, index) =>
                index === dataIndex
                  ? {
                      ...item,
                      subjects: item.subjects.map((sub, idx) =>
                        idx === itemIndex ? { ...sub, [field]: value } : sub
                      ),
                    }
                  : item
              ),
            }
          : category
      )
    );
  };
  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={`성적 관리 | ${student.name}`} />
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          학생목록
        </button>
      </div>

      {/* 학생 정보 카드 */}
      <div className="card bg-white shadow-lg p-6 mb-4">
        <CardTitle textValue={"기본 정보"} />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-neutral-500">이름</p>
            <p className="text-sm">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">생년월일</p>
            <p className="text-sm">{student.birthdate}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">학교</p>
            <p className="text-sm">{student.school}</p>
          </div>
        </div>
      </div>

      {/* 성적 유형 버튼 */}
      <div className="flex-col flex sm:flex-row sm:items-center mb-4">
        <div className="flex gap-2 items-center">
          {grades.map((category) => (
            <button
              key={category.type}
              className={`btn btn-sm ${
                selectedCategory === category.type
                  ? "btn-accent"
                  : "btn-outline"
              }`}
              onClick={() => {
                setSelectedCategory(category.type);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <button
            className="btn btn-sm btn-outline btn-info ml-2"
            onClick={handleEditMode}
          >
            {editMode ? "저장" : "수정"}
          </button>
        </div>
      </div>

      {/* 성적테이블 */}
      {selectedCategoryData && (
        <div className="card bg-white shadow-lg p-6 mb-4">
          <ul className="divide-y divide-stone-200">
            {selectedCategoryData.item.map((data, dataIndex) => (
              <li key={dataIndex} className="p-4">
                {editMode ? (
                  <>
                    <div className="flex mb-2">
                      <button
                        onClick={() => handleDeleteItem(dataIndex)}
                        className={`btn ml-auto ${
                          editMode ? "none" : "btn-disabled"
                        } btn-sm`}
                      >
                        카테고리 삭제
                      </button>
                    </div>
                    <input
                      className={`input mb-2 font-bold w-full p-2 rounded-md outline-none
                       border ${
                         editMode
                           ? "border-gray-400 focus:border-blue-400"
                           : "border-white"
                       }`}
                      type="text"
                      value={data.title}
                      onChange={(e) =>
                        handleItemTitleChange(e.target.value, dataIndex)
                      }
                    />
                  </>
                ) : (
                  <h3 className="font-bold mb-2">{data.title}</h3>
                )}
                <table className="text-sm table table-zebra w-full">
                  <thead>
                    <tr className="bg-sky-50 text-xs">
                      <th className="w-[50%] py-2">과목</th>
                      <th className="w-[40%] py-2">점수</th>
                      <th className="text-center py-2">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subjects.map((subject, index) => (
                      <tr key={index}>
                        <td className="py-2">
                          {editMode ? (
                            <input
                              value={subject.name}
                              type="text"
                              className="w-full px-2 py-1 rounded-md outline-none
                     border border-gray-400 focus:border-blue-400"
                              disabled={!editMode}
                              onChange={(e) =>
                                handleSubjectChange(
                                  dataIndex,
                                  index,
                                  e.target.value,
                                  "name"
                                )
                              }
                            />
                          ) : (
                            <span>{subject.name}</span>
                          )}
                        </td>
                        <td className="py-2">
                          {editMode ? (
                            <input
                              value={subject.score}
                              type="number"
                              className="w-full px-2 py-1 rounded-md outline-none
                     border border-gray-400 focus:border-blue-400"
                              disabled={!editMode}
                              onChange={(e) =>
                                handleSubjectChange(
                                  dataIndex,
                                  index,
                                  e.target.value,
                                  "score"
                                )
                              }
                            />
                          ) : (
                            <span>{subject.score}</span>
                          )}
                        </td>
                        <td className="text-center py-2">
                          {editMode && (
                            <DeleteSquareBtn
                              deleteFunc={() =>
                                handleDeleteLi(data.title, index)
                              }
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn w-full mt-2"
                  onClick={() => handleAddScore(data.title)}
                  disabled={!editMode}
                >
                  + 새 과목 추가({data.title})
                </button>
              </li>
            ))}
            {editMode && (
              <WideBtn
                onClickFunc={handleAddItem}
                textValue={"+ 새 카테고리 추가"}
              />
            )}
          </ul>
        </div>
      )}

      {/* 성적 변화 그래프 (차트 라이브러리 연동 가능) */}
      <div className="card bg-white shadow-lg p-6 mt-6">
        <CardTitle textValue={"성적 변화 추이"} />
        <p className="text-gray-600">과목별 성적 변화를 추적합니다.</p>
        <div className="h-40 bg-gray-200 rounded mt-4 flex items-center justify-center">
          <span className="text-gray-500">📊 차트 추가 예정</span>
        </div>
      </div>
    </MainLayout>
  );
}
