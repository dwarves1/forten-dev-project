import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockUnivData from "../mockUnivData";
import MainLayout from "../components/layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import SingleSearchBar from "../components/common/SingleSearchBar";

export default function ManageUniversities() {
  // 예제 공지사항 데이터 (API 연동 가능)
  const [universities, setUniversities] = useState(mockUnivData);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [selectedUniv, setSelectedUniv] = useState([]);
  const [filteredUnivs, setFilteredUnivs] = useState(universities);

  // 검색 기능
  const handleSearchUniv = () => {
    if (searchTerm.length == 0) {
      setFilteredUnivs(universities);
      return;
    } else {
      const filtered = universities.filter((univ) =>
        univ.univName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUnivs(filtered);
      return;
    }
  };

  const handleAddchecked = (univId) => {
    if (selectedUniv.includes(univId)) {
      setSelectedUniv((prev) => prev.filter((id) => id !== univId));
    } else {
      setSelectedUniv((prev) => [...prev, univId]);
    }
  };

  const handleDeleteChecked = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      setUniversities((prev) =>
        prev.filter((univ) => !selectedUniv.includes(univ.id))
      );

      setSelectedUniv([]);
    } else {
      return;
    }
  };

  useEffect(() => {
    setFilteredUnivs(universities);
  }, [universities]);

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"대학 입시 정보 관리"} />
      </div>

      {/* 공지사항 목록 */}
      <div className="card bg-white shadow-lg p-6">
        {/* 검색 기능 */}
        <SingleSearchBar
          onChangeValue={searchTerm}
          onChangeFunc={setSearchTerm}
          placeholder={"대학명"}
          searchFunc={handleSearchUniv}
        />
        <div className="flex items-center mb-6">
          <CardTitle textValue={"목록"} />
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleDeleteChecked}
              className="btn btn-sm btn-outline btn-error"
            >
              삭제
            </button>
            <Link to="/manageuniversities/adduniv">
              <button className="btn btn-sm btn-outline btn-accent">
                추가
              </button>
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-stone-200">
          {filteredUnivs.map((univ) => (
            <li key={univ.id} className="p-4 flex justify-between items-center">
              <input
                type="checkbox"
                onClick={() => handleAddchecked(univ.id)}
                className="mr-4 checkbox checkbox-xs sm:checkbox-sm"
              />
              <div className="mr-auto text-sm">
                <h4>{univ.univName} </h4>
                <div>
                  <span className="text-neutral-600">{univ.department}</span>
                </div>
              </div>
              <Link to={`/manageuniversities/edituniv/${univ.id}`}>
                <button className="btn btn-sm btn-outline">보기</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}
