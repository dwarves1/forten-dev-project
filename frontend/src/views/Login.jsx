import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 pt-40">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>

        <label className="form-control w-full mb-4">
          <span className="label-text text-sm">이메일</span>
          <input
            type="email"
            placeholder="example@email.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="form-control w-full mb-4">
          <span className="label-text text-sm">비밀번호</span>
          <input
            type="password"
            placeholder=""
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="btn btn-primary w-full">로그인</button>

        <div className="flex justify-center mt-8">
          <Link to="/register">
            <span className="text-neutral-700 text-xs">회원가입</span>
          </Link>
          <div className="divider divider-horizontal"></div>
          <Link to="/findpassword">
            <span className="text-neutral-700 text-xs">비밀번호 찾기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
