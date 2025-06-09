import { useCallback, useEffect, useRef, useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";

const FIELD_TYPE = {
  studentId: "studentId",
  name: "name",
  gender: "gender",
  school: "school",
  educationalGroup: "educationalGroup",
};

export default function AddStudent() {
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    gender: "male",
    school: "",
    educationalGroup: "",
  });

  const handleFieldChange = (e, fieldType) => {
    const value = e.target.value;
    setStudentInfo((prev) => ({ ...prev, [fieldType]: value }));
  };

  const handleUploadImgChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPreview(reader.result);
      setImgFile(file);
    };

    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    console.log(imgFile);
    console.log(imgPreview);
  }, [imgFile, imgPreview]);

  return (
    <MainLayout>
      <PageTitle textvaule={"학생 등록"} />
      <div className="flex justify-end mb-4">
        <button className="btn btn-sm btn-outline btn-info">저장</button>
      </div>
      <CardLayout>
        <CardTitle textValue={"학생 정보"} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">학생이름</span>
            <input
              type="text"
              className="w-full input focus:border-blue-400"
              placeholder="학생이름"
              value={studentInfo.name}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.name)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">성별</span>
            <select
              className="select w-full focus:border-blue-400"
              value={studentInfo.gender}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.gender)}
            >
              <option value={"male"}>남</option>
              <option value={"female"}>여</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">학교명</span>
            <input
              type="text"
              className="w-full input focus:border-blue-400"
              placeholder="학교명"
              value={studentInfo.school}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.school)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">교육원</span>
            <select
              className="select w-full focus:border-blue-400"
              value={studentInfo.educationalGroup}
              onChange={(e) =>
                handleFieldChange(e, FIELD_TYPE.educationalGroup)
              }
            >
              <option value={"남구"}>남구</option>
              <option value={"동구"}>동구</option>
              <option value={"북구"}>북구</option>
              <option value={"중구"}>중구</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-sm text-neutral-600 mb-1">이미지 선택</span>
          {imgPreview && (
            <div className="mb-1">
              <img
                className="h-28 object-cover aspect-3/4 border-1 border-stone-400"
                src={imgPreview}
                alt="미리보기 이미지"
              />
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            className="file-input focus:border-blue-400"
            accept="image/*"
            onChange={(e) => handleUploadImgChange(e)}
          />
        </div>
      </CardLayout>
    </MainLayout>
  );
}
