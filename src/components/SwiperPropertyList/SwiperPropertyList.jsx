import { useCallback, useRef, useState } from "react";
import {
  CardMonthPick,
  CardProperty,
  SwiperButtonNext,
  SwiperButtonPrevious,
} from "@/components";
import { useResponsiveWidth } from "@/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SwiperPropertyList({ numberOfProperties = 6 }) {
  const { screenSizes } = useResponsiveWidth();

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = useCallback(() => {
    if (!sliderRef.current) return;
    setIsBeginning(sliderRef.current.swiper.isBeginning);
    setIsEnding(sliderRef.current.swiper.isEnd);
  }, []);

  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  return (
    <div className="container max-md:pr-0">
      <div className="relative">
        <Swiper
          ref={sliderRef}
          spaceBetween={4}
          slidesPerView={1.15}
          breakpoints={{
            [screenSizes.md]: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            [screenSizes["4xl"]]: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          onSlideChange={handleSlideChange}
        >
          {[...Array(numberOfProperties)].map((item, index) => (
            <SwiperSlide key={`slide-property-${index}`}>
              <CardProperty />
            </SwiperSlide>
          ))}
        </Swiper>
        {numberOfProperties > 2 && (
          <>
            <SwiperButtonPrevious onClick={handlePrev} disabled={isBeginning} />
            <SwiperButtonNext onClick={handleNext} disabled={isEnding} />
          </>
        )}
      </div>
    </div>
  );
}
