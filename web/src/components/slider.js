import React from "react";
import { Swiper } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";

import "swiper/swiper.scss";

SwiperCore.use([Mousewheel]);

const Slider = (props) => {
    return (
        <Swiper
            centeredSlides={true}
            centerInsufficientSlides={true}
            freeMode={true}
            simulateTouch={false}
            loop={true}
            mousewheel={{ sensitivity: 1 }}
            breakpoints={{
                // when window width is more than 0px
                0: {
                    spaceBetween: 100,
                    slidesPerView: 2,
                    // slidesOffsetBefore: 50,
                    // slidesOffsetAfter: 50,
                },
                // when window width is more than 640px
                640: {
                    spaceBetween: 50,
                    slidesPerView: 2.5,
                    // slidesOffsetBefore: 100,
                    // slidesOffsetAfter: 100,
                },
                // when window width is more than 768px
                768: {
                    spaceBetween: 100,
                    slidesPerView: 3,
                    // slidesOffsetBefore: 200,
                    // slidesOffsetAfter: 200,
                },
            }}
        >
            {props.children}
        </Swiper>
    );
};

export default Slider;
