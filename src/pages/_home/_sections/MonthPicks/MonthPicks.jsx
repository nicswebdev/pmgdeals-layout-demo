import {useCallback, useRef, useState} from "react";
import {
    CardMonthPick,
    SwiperButtonNext,
    SwiperButtonPrevious,
} from "@/components";
import {useResponsiveWidth} from "@/hooks";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

export default function MonthPicks({deals}) {
    const {screenSizes} = useResponsiveWidth();

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
        <div className="pt-[9.5rem] sm:pt-[11.75rem]lg:pt-48 xl:pt-[8.25rem] bg-gray-dark">
            <div className="pb-14 lg:pb-20 lg:pt-36">
                <div className="container">
                    <h1 className="pb-6 lg:pb-12 lg:text-[3rem] text-white">
                        <span className="font-bold italic">
                            Most Popular Picks{" "}
                        </span>
                        <span>This Month</span>
                    </h1>
                </div>
                <div className="container">
                    <div className="relative">
                        <Swiper
                            ref={sliderRef}
                            spaceBetween={20}
                            slidesPerView={1.4}
                            breakpoints={{
                                [screenSizes.md]: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                [screenSizes["lg"]]: {
                                    slidesPerView: 3,
                                    spaceBetween: 24,
                                },
                            }}
                            //   className="mySwiper"
                            onSlideChange={handleSlideChange}
                            //   onSwiper={(swiper) => console.log(swiper)}
                        >
                            {deals &&
                                deals.map((item, index) => (
                                    <SwiperSlide
                                        key={`slide-month-pick-${index}`}
                                    >
                                        <CardMonthPick
                                            key={`card-month-pick-${index}`}
                                            deals={item}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>

                        {deals && deals.length > 3 && (
                            <>
                                <SwiperButtonPrevious
                                    onClick={handlePrev}
                                    disabled={isBeginning}
                                />
                                <SwiperButtonNext
                                    onClick={handleNext}
                                    disabled={isEnding}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
