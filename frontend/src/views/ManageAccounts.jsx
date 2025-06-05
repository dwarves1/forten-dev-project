import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import CustomPagination from "../components/common/CustomPagination";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import SingleSearchBar from "../components/common/SingleSearchBar";
import { Link } from "react-router-dom";

const ROLE_TYPE_STYLE = {
  학생: "bg-amber-100",
  강사: "bg-sky-100",
  학부모: "bg-gray-200",
};

export default function ManageAccounts() {
  // 예제 계정 데이터 (API 연동 가능)
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "김민수",
      role: "강사",
      email: "minsu@example.com",
      phone: "010-1234-5678",
      active: true,
    },
    {
      id: 2,
      name: "이서연",
      role: "학생",
      email: "seoyeon@example.com",
      phone: "010-5678-1234",
      adress: "서울시 관악구 보라매동",
      school: "서울여자고등학교",
      active: true,
    },
    {
      id: 3,
      name: "박지훈",
      role: "강사",
      email: "jihun@example.com",
      phone: "010-8765-4321",
      active: false,
    },
    {
      id: 4,
      name: "이민주",
      role: "학부모",
      kid: "이서연",
      email: "minju@example.com",
      phone: "010-8550-7852",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountIds, setAccountIds] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  // 새 계정 데이터 관리
  const [newAccount, setNewAccount] = useState({
    name: "",
    role: "학생",
    email: "",
    phone: "",
    active: true,
  });

  // Pagination 설정
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // 계정 수정 버튼 클릭
  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setNewAccount(account);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // 계정 저장 (추가 또는 수정)
  const handleSaveAccount = () => {
    if (!newAccount.name || !newAccount.email || !newAccount.phone) {
      alert("모든 필수 정보를 입력하세요.");
      return;
    }

    if (isEditMode) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === selectedAccount.id ? newAccount : acc
        )
      );
    } else {
      setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
    }

    setIsModalOpen(false);
  };

  // 계정 checkbox 선택
  const handleCheckAccount = (id) => {
    setAccountIds((prev) =>
      prev.includes(id) ? prev.filter((accid) => accid !== id) : [...prev, id]
    );
  };

  // 계정 그룹 삭제
  const handleDeleteAccountsGroup = () => {
    if (window.confirm("선택한 계정을 삭제할까요?")) {
      const newAccounts = accounts.filter(
        (acc) => !accountIds.includes(acc.id)
      );
      setAccounts(newAccounts);
      setAccountIds([]); // 삭제 후 체크된 ID 초기화
    }
  };

  // 계정 비활성화
  const toggleAccountStatus = () => {
    if (accountIds.length === 0) {
      alert("선택된 계정이 없습니다.");
      return;
    }

    if (window.confirm("선택한 계정들을 비활성화할까요?")) {
      setAccounts(
        accounts.map((acc) =>
          accountIds.includes(acc.id) ? { ...acc, active: false } : acc
        )
      );
      setAccountIds([]);
    }
  };

  // 검색 기능
  const handleSearchBtn = () => {
    const filtered = accounts.filter((acc) => acc.name.includes(searchTerm));
    setCurrentPage(1);
    setFilteredAccounts(filtered);
  };

  useEffect(() => {
    setFilteredAccounts(accounts);
  }, [accounts]);

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"계정 관리"} />
      </div>

      {/* 계정 목록 */}
      <div className="card bg-white shadow-lg p-6">
        <Link to={`/manageaccounts/request`} className="ml-auto">
          <button className="btn btn-sm btn-outline btn-warning w-fit">
            승인요청
          </button>
        </Link>
        {/* 검색 기능 */}
        <SingleSearchBar
          onChangeValue={searchTerm}
          onChangeFunc={setSearchTerm}
          searchFunc={handleSearchBtn}
          placeholder={"제목"}
        />

        <div className="flex justify-between items-center">
          <CardTitle textValue={"목록"} />
          <div>
            <button
              onClick={toggleAccountStatus}
              className="btn btn-sm btn-outline btn-primary mr-2"
            >
              비활성화
            </button>
            <button
              onClick={handleDeleteAccountsGroup}
              className="btn btn-sm btn-outline btn-error"
            >
              선택삭제
            </button>
          </div>
        </div>
        <ul className="divide-y divide-stone-200 mt-2">
          {filteredAccounts.map((acc) => (
            <li key={acc.id} className="p-2 sm:py-4">
              <div className="w-full flex items-center justify-between">
                <input
                  type="checkbox"
                  className="mr-4 checkbox checkbox-xs sm:checkbox-sm"
                  value={acc.id}
                  onChange={() => handleCheckAccount(acc.id)}
                />
                <div className="sm:flex sm:flex-row w-full">
                  <div className="flex items-center gap-2 mr-auto">
                    <span className="text-nowrap text-sm">{acc.name}</span>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        acc.active ? "bg-green-500" : "bg-neutral-400"
                      }`}
                    ></div>
                    <div
                      className={`badge badge-sm text-nowrap text-neutral-800 ${
                        ROLE_TYPE_STYLE[acc.role]
                      }`}
                    >
                      {acc.role}
                    </div>
                  </div>

                  <div className="flex gap-1 mt-2 sm:mt-0 justify-end">
                    <button
                      onClick={() => handleEditClick(acc)}
                      className="btn btn-xs sm:btn-sm text-sky-500 font-normal"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        return;
                      }}
                      className="btn btn-xs sm:btn-sm font-normal"
                    >
                      비밀번호 변경
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((prev) => prev - 1)}
        onNext={() => setCurrentPage((prev) => prev + 1)}
      />

      {/* 계정 수정 모달 */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "modal-open" : "none"}`}>
          <div className="modal-box">
            <CardTitle textValue={isEditMode ? "계정 수정" : "계정 추가"} />
            {/* 이메일 */}
            <label className="form-control">
              <span className="label-text text-sm">이메일</span>
              <input
                type="email"
                className="mb-2 input text-neutral-400 border-neutral-300 focus:border-neutral-300 w-full"
                value={newAccount.email}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, email: e.target.value })
                }
                readOnly
                aria-readonly
              />
            </label>

            {/* 이름 */}
            <label className="form-control">
              <span className="label-text text-sm">이름</span>
              <input
                type="text"
                className="mb-2 input border-neutral-300 focus:border-neutral-600 w-full"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
              />
            </label>

            {/* 전화번호 */}
            <label className="form-control">
              <span className="label-text text-sm">전화번호</span>
              <input
                type="text"
                className="mb-2 input border-neutral-300 focus:border-neutral-600 w-full"
                value={newAccount.phone}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, phone: e.target.value })
                }
              />
            </label>

            {newAccount.role == "학생" ? (
              // {/* 주소 */}
              <>
                <label className="form-control">
                  <span className="label-text text-sm">주소</span>
                  <input
                    type="text"
                    className="mb-2 input border-neutral-300 focus:border-neutral-600 w-full"
                    value={newAccount.adress}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                  />
                </label>

                <label className="form-control">
                  <span className="label-text text-sm">학교</span>
                  <input
                    type="text"
                    className="mb-2 input border-neutral-300 focus:border-neutral-600 w-full"
                    value={newAccount.school}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                  />
                </label>
              </>
            ) : null}

            {newAccount.role == "학부모" ? (
              <label className="form-control">
                <span className="label-text text-sm">자녀</span>
                <input
                  type="text"
                  className="mb-2 input border-neutral-300 focus:border-neutral-600 w-full"
                  value={newAccount.kid}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, name: e.target.value })
                  }
                />
              </label>
            ) : null}

            <label className="form-control">
              <span className="label-text text-sm">역할</span>
              <select
                className="select border-neutral-300 focus:border-neutral-600 w-full"
                value={newAccount.role}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, role: e.target.value })
                }
              >
                <option value="학생">학생</option>
                <option value="강사">강사</option>
                <option value="학부모">학부모</option>
              </select>
            </label>

            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveAccount}
              >
                {isEditMode ? "수정" : "추가"}
              </button>
              <button
                className="btn btn-secondary btn-sm ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
