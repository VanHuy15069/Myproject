import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';

const cx = classNames.bind(styles);
function Home() {
    const [sliers, setSliders] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/slider/getSlider')
            .then((res) => {
                setSliders(res.data.response);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                {sliers && (
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        loop={true}
                        speed={900}
                        rewind={false}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="wrapper-slider"
                    >
                        {sliers.map((slider, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img
                                        className={cx('img-slider')}
                                        src={`http://localhost:4000/src/${slider.image}`}
                                        alt=""
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
export default Home;
