import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';
import ListMusic from '~/components/ListMusic/ListMusic';

const cx = classNames.bind(styles);
function Home() {
    const navigate = useNavigate();
    const [sliers, setSliders] = useState([]);
    const [topMusics, setTopMusics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [firsTopic, setFirstTopic] = useState([]);
    const [secondTopic, setSecondTopic] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/slider/getSlider')
            .then((res) => {
                setSliders(res.data.response);
            })
            .catch((r) => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getAllMusic', {
                params: {
                    limit: 5,
                    name: 'views',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setTopMusics(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/topic/getAll')
            .then((res) => {
                setTopics(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        if (topics.length > 0) {
            axios
                .get(`http://localhost:4000/api/topic/getOnly/${topics[0].id}`)
                .then((res) => {
                    setFirstTopic(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [navigate, topics]);
    useEffect(() => {
        if (topics.length > 1) {
            axios
                .get(`http://localhost:4000/api/topic/getOnly/${topics[1].id}`)
                .then((res) => {
                    setSecondTopic(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [navigate, topics]);
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
            <div className={cx('list-music')}>
                <ListMusic title={'Có thể bạn muốn nghe'} music={topMusics} />
            </div>
            {firsTopic && (
                <div className={cx('list-music')}>
                    <ListMusic title={firsTopic.title} music={firsTopic.musicInfo} />
                </div>
            )}
            {secondTopic && (
                <div className={cx('list-music')}>
                    <ListMusic title={secondTopic.title} music={secondTopic.musicInfo} />
                </div>
            )}
        </div>
    );
}
export default Home;
