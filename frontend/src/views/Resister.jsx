import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm({ mode: "onSubmit" });

  const REG_EXP_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [startedConfirm, setStartedConfirm] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    trigger("password");
  }, [password, trigger]);

  useEffect(() => {
    trigger("confirmPassword");
  }, [confirmPassword, password, trigger]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 pt-28">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">이름</span>
            <input
              type="text"
              placeholder="이름"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", { required: "이름을 입력해주세요." })}
            />
          </label>
          {errors.name && (
            <p className="validator-hint text-error mb-2">
              {errors.name.message}
            </p>
          )}

          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">생년월일</span>
            <input
              type="date"
              className={`input input-bordered w-full ${
                errors.birthdate ? "input-error" : ""
              }`}
              {...register("birthdate", {
                required: "생년월일을 입력해주세요.",
              })}
            />
          </label>
          {errors.birthdate && (
            <p className="validator-hint text-error mb-2">
              {errors.birthdate.message}
            </p>
          )}

          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">이메일</span>
            <input
              type="email"
              placeholder="example@email.com"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
          </label>
          {errors.email && (
            <p className="validator-hint text-error mb-2">
              {errors.email.message}
            </p>
          )}

          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호"
              className={`input input-bordered w-full ${
                password && errors.password ? "input-error" : ""
              }`}
              maxLength={20}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: REG_EXP_PASSWORD,
                  message: "영문, 숫자 포함 8자 이상 20자 이하로 입력해주세요.",
                },
              })}
            />
          </label>

          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              className={`input input-bordered w-full ${
                startedConfirm && errors.confirmPassword ? "input-error" : ""
              }`}
              maxLength={20}
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              onChange={() => {
                if (!startedConfirm) setStartedConfirm(true);
              }}
            />
          </label>
          {startedConfirm && errors.confirmPassword && (
            <p className="validator-hint text-error mb-2">
              {errors.confirmPassword.message}
            </p>
          )}

          <label className="form-control w-full mb-4">
            <span className="label-text text-sm">학원 코드</span>
            <input
              type="text"
              placeholder="학원 코드를 입력하세요"
              className={`input input-bordered w-full ${
                errors.academyCode ? "input-error" : ""
              }`}
              {...register("academyCode", {
                required: "학원 코드를 입력해주세요.",
              })}
            />
          </label>
          <button className="btn btn-primary w-full mt-6" type="submit">
            회원가입
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
