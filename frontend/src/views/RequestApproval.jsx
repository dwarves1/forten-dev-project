import { useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import ItemBadge from "../components/ui/ItemBadge";

export default function RequestApproval() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "정ㅇㅇ",
      email: "jj@example.com",
      phone: "010-5678-1212",
      adress: "서울시 관악구 봉천동",
      role: "",
    },
    {
      id: 2,
      name: "김ㅇㅇ",
      email: "kk@example.com",
      phone: "010-5678-2323",
      adress: "서울시 관악구 신림동",
      role: "",
    },
    {
      id: 3,
      name: "박ㅇㅇ",
      email: "pp@example.com",
      phone: "010-5678-3434",
      adress: "서울시 관악구 남현동",
      role: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(false);
  const [accountIds, setAccountIds] = useState([]);

  const handleDetailBtn = (account) => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setSelectedAccount(null);
    } else {
      setIsModalOpen(true);
      setSelectedAccount(account);
    }
  };

  // 승인
  const handleApproval = (accId) => {
    if (selectedAccount.role === "") {
      window.alert("역할을 선택해주세요.");
      return;
    }

    if (
      selectedAccount.role === "student" &&
      selectedAccount.school.replace(/ /g, "") === ""
    ) {
      window.alert("학교를 입력해주세요.");
      return;
    }

    if (window.confirm("이 계정을 승인하겠습니까?")) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== accId));
      setIsModalOpen(false);
      setSelectedAccount(null);
    }
  };

  // 계정 역할 선택
  const handleRoleSelect = (roleValue) => {
    setSelectedAccount((prev) => ({ ...prev, role: roleValue }));
  };

  // 학생 학교 input
  const handleSchoolInput = (inputValue) => {
    setSelectedAccount((prev) => ({ ...prev, school: inputValue }));
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

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"승인요청"} />
      </div>
      <CardLayout>
        <div className="flex justify-between items-center">
          <CardTitle textValue={"목록"} />
          <div>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => handleDeleteAccountsGroup()}
            >
              선택삭제
            </button>
          </div>
        </div>
        <ul className="divide-y divide-stone-200 mt-2">
          {accounts.map((account) => (
            <li className="p-2 sm:py-4" key={account.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <input
                    onChange={() => handleCheckAccount(account.id)}
                    type="checkbox"
                    className="mr-4 checkbox checkbox-xs sm:checkbox-sm"
                  />
                  <span>{account.name}</span>
                </div>
                <button
                  className="btn btn-sm font-normal"
                  onClick={() => handleDetailBtn(account)}
                >
                  상세
                </button>
              </div>
            </li>
          ))}
        </ul>
      </CardLayout>

      {selectedAccount && (
        <div className={`modal ${selectedAccount ? "modal-open" : "none"}`}>
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <CardTitle textValue={"승인요청 계정"} />
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-success"
                  onClick={() => handleApproval(selectedAccount.id)}
                >
                  승인
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleDetailBtn(selectedAccount)}
                >
                  닫기
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div className="mb-2">
                <ItemBadge textValue={"이름"} />
                <span className="ml-2">{selectedAccount.name}</span>
              </div>
              <div className="mb-2">
                <ItemBadge textValue={"연락처"} />
                <span className="ml-2">{selectedAccount.phone}</span>
              </div>
              <div className="mb-2">
                <ItemBadge textValue={"주소"} />
                <span className="ml-2">{selectedAccount.adress}</span>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <ItemBadge textValue={"역할"} />
              <select
                className="select w-full h-8 ml-2 focus:border-blue-400"
                defaultValue="역할을 선택해주세요"
                onChange={(e) => handleRoleSelect(e.target.value)}
              >
                <option disabled={true}>역할을 선택해주세요</option>
                <option value="instructor">강사</option>
                <option value="student">학생</option>
                <option value="parent">보호자</option>
              </select>
            </div>
            {selectedAccount.role === "student" && (
              <>
                <div className="flex items-center mb-2 text-sm">
                  <ItemBadge textValue={"학교"} />
                  <input
                    type="text"
                    className="input ml-2 h-8 focus:border-blue-400 w-full"
                    onChange={(e) => handleSchoolInput(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
