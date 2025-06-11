import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  // useEffect -> useLayoutEffect 변경
  // 화면 렌더링 전에 스크롤 이동 처리해서 깜빡임 방지
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  return null;
}
