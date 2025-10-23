import {useCallback, useRef, useState} from "react";
import {
    ButtonBasic,
    CardMonthPick,
    CardProperty,
    SwiperButtonNext,
    SwiperButtonPrevious,
} from "@/components";
import {useResponsiveWidth} from "@/hooks";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {FaGoogle, FaUser} from "react-icons/fa";

export default function HeroDetails() {
    const images = ["/images/hero.png", "/images/hero.png"];
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
        <div className="min-h-[90vh] max-md:min-h-[40vh] relative">
            <Swiper
                ref={sliderRef}
                spaceBetween={4}
                slidesPerView={1.15}
                breakpoints={{
                    [screenSizes.md]: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    [screenSizes["lg"]]: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                }}
                onSlideChange={handleSlideChange}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={`slide-property-${index}`}>
                        <img
                            src={item}
                            alt=""
                            className="w-full h-[90vh] max-md:h-[90vh] min-h-[50vh] max-md:min-h-[40vh] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperButtonPrevious onClick={handlePrev} disabled={isBeginning} />
            <SwiperButtonNext onClick={handleNext} disabled={isEnding} />
            <div className="w-full h-[7rem] bg-transparent absolute bottom-10 z-10 flex justify-center items-center">
                <div className="w-[60%] h-[7rem] px-6 bg-black/70 text-white flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="font-bold text-[1.5rem]">
                            Get Instant Access
                        </span>
                        <span>
                            Be our privileged member and enjoy the excusive
                            deals
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <ButtonBasic href="/login" variant="blue">
                            <FaGoogle className="w-8 h-8" />
                            <span className="shrink-0">
                                Continue with Google
                            </span>
                        </ButtonBasic>
                        <ButtonBasic href="/login" variant="orange">
                            <FaUser className="w-8 h-8" />
                            <span className="shrink-0">Create an Account</span>
                        </ButtonBasic>
                    </div>
                </div>
            </div>
        </div>
    );
}
