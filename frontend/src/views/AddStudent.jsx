import { useCallback, useEffect, useRef, useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, studentSliceResetStatus } from "../service/studentSlice";
import toast from "react-hot-toast";

const FIELD_TYPE = {
  name: "name",
  gender: "gender",
  school: "school",
  district: "district",
};

export default function AddStudent() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.student);

  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    gender: "M",
    school: "",
    district: "남구",
  });

  const handleFieldChange = (e, fieldType) => {
    const value = e.target.value;
    setStudentInfo((prev) => ({ ...prev, [fieldType]: value }));
  };

  const handleUploadImgChange = useCallback(
    (e) => {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      const file = e.target.files?.[0];
      if (!file) return;

      if (file && file.size > MAX_FILE_SIZE) {
        alert("파일 크기가 5MB 제한을 초과했습니다.");

        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("지원되지 않는 이미지 형식입니다.");
        inputRef.current.value = null;

        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setImgPreview(reader.result);
        setImgFile(file);
      };

      reader.readAsDataURL(file);
    },
    [inputRef]
  );

  // 저장 요청 함수
  const handleSubmit = () => {
    if (loading) return;

    if (!studentInfo.name || !studentInfo.school) {
      toast.error("학생명과 학교명을 입력해주세요.");
      return;
    }

    const payload = {
      ...studentInfo,
      imgFile,
    };

    dispatch(addStudent(payload));
  };

  // 등록 성공&실패 시 알림
  useEffect(() => {
    if (success) {
      toast.success("학생이 성공적으로 등록되었습니다.");

      // 인풋 초기화
      setStudentInfo({
        name: "",
        gender: "M",
        school: "",
        district: "남구",
      });
      setImgFile(null);
      setImgPreview(null);
      inputRef.current.value = null;

      dispatch(studentSliceResetStatus());
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(`학생 등록에 실패했습니다. \n ${error}`);

      dispatch(studentSliceResetStatus());
    }
  }, [error]);

  return (
    <MainLayout>
      <PageTitle textvaule={"학생 등록"} />
      <div className="flex justify-end mb-4">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="btn btn-sm btn-outline btn-info"
        >
          {loading ? "저장중" : "저장"}
        </button>
      </div>
      <CardLayout>
        <CardTitle textValue={"학생 정보"} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">학생명</span>
            <input
              type="text"
              className="w-full input focus:border-blue-400"
              placeholder="학생명"
              value={studentInfo.name}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.name)}
              disabled={loading}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">성별</span>
            <select
              className="select w-full focus:border-blue-400"
              value={studentInfo.gender}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.gender)}
              disabled={loading}
            >
              <option value="M">남</option>
              <option value="F">여</option>
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
              disabled={loading}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-neutral-600 mb-1">교육원</span>
            <select
              className="select w-full focus:border-blue-400"
              value={studentInfo.district}
              onChange={(e) => handleFieldChange(e, FIELD_TYPE.district)}
              disabled={loading}
            >
              <option value={"남구"}>남구</option>
              <option value={"동구"}>동구</option>
              <option value={"북구"}>북구</option>
              <option value={"중구"}>중구</option>
              <option value={"기타"}>기타</option>
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
            disabled={loading}
          />
        </div>
      </CardLayout>
    </MainLayout>
  );
}
