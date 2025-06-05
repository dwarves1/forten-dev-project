import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";

export default function HomeCarousel() {
  const baseUrl = "https://react-slick.neostack.com/img/react-slick";
  const sliderRef = useRef(null);

  const settings = {
    beforeChange: () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    },
    appendDots: (dots) => (
      <ul
        role="tablist"
        aria-label="슬라이드 선택"
        style={{
          display: "flex",
          position: "absoute",
          bottom: "16px",
          justifyContent: "center",
          gap: "4px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {dots.map((_, index) => (
          <li
            onClick={() => sliderRef.current.slickGoTo(index)}
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-slash-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0"
              />
            </svg>
          </li>
        ))}
      </ul>
    ),
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="slider-container w-full">
      <Slider {...settings} ref={sliderRef}>
        <div>
          <img
            className="w-full max-h-72 sm:max-h-92 md:max-h-120 lg:max-h-152 object-cover"
            src={baseUrl + "/abstract01.jpg"}
          />
        </div>
        <div>
          <img
            className="w-full max-h-72 sm:max-h-92 md:max-h-120 lg:max-h-152 object-cover"
            src={baseUrl + "/abstract02.jpg"}
          />
        </div>
        <div>
          <img
            className="w-full max-h-72 sm:max-h-92 md:max-h-120 lg:max-h-152 object-cover"
            src={baseUrl + "/abstract03.jpg"}
          />
        </div>
        <div>
          <img
            className="w-full max-h-72 sm:max-h-92 md:max-h-120 lg:max-h-152 object-cover"
            src={baseUrl + "/abstract04.jpg"}
          />
        </div>
      </Slider>
    </div>
  );
}
