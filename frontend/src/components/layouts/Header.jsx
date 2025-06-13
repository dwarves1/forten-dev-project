import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MENU = [
  // { linkTo: "/notice", value: "공지사항" },
  // { linkTo: "/university", value: "대학입시정보" },
  // { linkTo: "/recommended", value: "대학추천" },
  { linkTo: "/academy-test", value: "학원실기테스트" },
];

export default function Header() {
  const location = useLocation();
  const [position, setPosition] = useState(0);
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPosition(window.scrollY);
    });
    return () => {
      window.addEventListener("scroll", () => {
        setPosition(window.scrollY);
      });
    };
  }, []);

  useEffect(() => {
    const drawerCheckbox = document.getElementById("my-drawer-4");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  }, [location.pathname]);

  return (
    <div
      className={`fixed top-0 z-10 flex justify-center w-full h-12 sm:h-16 transition duration-200 ${
        isHome && position < 100 ? "bg-black/25" : "bg-base-200 drop-shadow-sm"
      }`}
    >
      <div className="navbar max-w-6xl min-h-12 sm:min-h-16">
        <Link to="/" className="sm:mr-8">
          <img
            className="object-cover w-22 min-w-18"
            src="localhost:8080/forten_logo_color.png"
            alt="포텐 로고"
          />
        </Link>
        <div className="flex-1 hidden sm:block text-sm">
          <ul
            className={`flex gap-10 ${
              isHome && position < 100 ? "text-white" : "text-black"
            }`}
          >
            {MENU.map((list) => (
              <li
                key={list.value}
                className="hover:text-[#003AAC] transition-colors duration-150"
              >
                <Link to={list.linkTo}>
                  <div>{list.value}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 hidden sm:block">
          {/* <ul tabIndex={0} className="flex z-1 gap-8 text-xs text-white">
            <li
              className={`flex gap-10 ${
                isHome && position < 100 ? "text-white" : "text-black"
              }`}
            >
              <Link to="/directordashboard">원장</Link>
            </li>
            <li
              className={`flex gap-10 ${
                isHome && position < 100 ? "text-white" : "text-black"
              }`}
            >
              <Link to="/instructordashboard">강사</Link>
            </li>
            <li
              className={`flex gap-10 ${
                isHome && position < 100 ? "text-white" : "text-black"
              }`}
            >
              <Link to="/studentdashboard">학생</Link>
            </li>
            <li
              className={`flex gap-10 ${
                isHome && position < 100 ? "text-white" : "text-black"
              }`}
            >
              <Link to="/login">로그인</Link>
            </li>
          </ul> */}
        </div>
        {/* 햄버거메뉴 */}
        <div className="sm:hidden drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className={`transition-colors duration-200 ${
                  isHome && position < 100 ? "text-white" : "text-black"
                } inline-block h-6 w-6 stroke-current absolute right-0 top-[50%] transfrom -translate-y-[50%]`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-48 p-4">
              {MENU.map((list) => (
                <li key={list.value}>
                  <Link to={list.linkTo} className="p-2 py-3">
                    <div className="text-xs">{list.value}</div>
                  </Link>
                </li>
              ))}
              <div className="divider"></div>
              {/* <Link to="/directordashboard">
                <li className="py-2 btn btn-sm btn-ghost font-normal">원장</li>
              </Link>
              <Link to="/instructordashboard">
                <li className="py-2 btn btn-sm btn-ghost font-normal">강사</li>
              </Link>
              <Link to="/studentdashboard">
                <li className="py-2 btn btn-sm btn-ghost font-normal">학생</li>
              </Link>
              <Link to="/login">
                <li className="py-2 btn btn-sm btn-ghost font-normal">
                  로그인
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
