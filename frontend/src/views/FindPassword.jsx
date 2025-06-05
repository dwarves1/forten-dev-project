import { useState } from "react";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    // 비밀번호 재설정 요청 API 호출 로직 (추후 추가)
    alert(`비밀번호 재설정 링크가 ${email}로 전송되었습니다.`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">비밀번호 찾기</h2>

        <label className="form-control w-full mb-4">
          <span className="label-text">이메일</span>
          <input
            type="email"
            placeholder="example@email.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button
          className="btn btn-primary w-full"
          onClick={handlePasswordReset}
          disabled={!email}
        >
          비밀번호 재설정 링크 전송
        </button>

        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            로그인 페이지로 이동
          </a>
        </div>
      </div>
    </div>
  );
}
