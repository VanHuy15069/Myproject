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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MusicItemSmall from '~/components/MusicItemSmall/MusicItemSmall';

const cx = classNames.bind(styles);
function Home() {
    const navigate = useNavigate();
    const [sliers, setSliders] = useState([]);
    const [topMusics, setTopMusics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [firsTopic, setFirstTopic] = useState([]);
    const [secondTopic, setSecondTopic] = useState([]);
    const [thirtTopic, setThirtTopic] = useState([]);
    const [newMusicAll, setNewMusicAll] = useState([]);
    const [newMusicVN, setNewMusicVN] = useState([]);
    const [newMusics, setNewMusics] = useState([]);
    const [newMusicQT, setNewMusicQT] = useState([]);
    const [active, setActive] = useState({
        all: true,
        vn: false,
        qt: false,
    });
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getAllMusic', {
                params: {
                    limit: 15,
                    name: 'createdAt',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setNewMusicAll(res.data.response);
                setNewMusics(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getVietNam', {
                params: { limit: 15 },
            })
            .then((res) => {
                if (res.data.err === 0) {
                    setNewMusicVN(res.data.response.musicInfo);
                }
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getInternational', {
                params: { limit: 15 },
            })
            .then((res) => {
                if (res.data.err === 0) {
                    setNewMusicQT(res.data.response.musicInfo);
                }
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/slider/getSlider')
            .then((res) => {
                setSliders(res.data.response);
            })
            .catch(() => navigate('/error'));
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
                .get(`http://localhost:4000/api/topic/getOnly/${topics[0].id}`, {
                    params: {
                        limit: 5,
                        name: 'views',
                        sort: 'DESC',
                    },
                })
                .then((res) => {
                    setFirstTopic(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [navigate, topics]);
    useEffect(() => {
        if (topics.length > 1) {
            axios
                .get(`http://localhost:4000/api/topic/getOnly/${topics[1].id}`, {
                    params: {
                        limit: 5,
                        name: 'views',
                        sort: 'DESC',
                    },
                })
                .then((res) => {
                    setSecondTopic(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [navigate, topics]);
    useEffect(() => {
        if (topics.length > 2) {
            axios
                .get(`http://localhost:4000/api/topic/getOnly/${topics[2].id}`, {
                    params: {
                        limit: 5,
                        name: 'views',
                        sort: 'DESC',
                    },
                })
                .then((res) => {
                    setThirtTopic(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [navigate, topics]);

    const getAll = () => {
        setNewMusics(newMusicAll);
        setActive({ all: true, vn: false, qt: false });
    };
    const getVN = () => {
        setNewMusics(newMusicVN);
        setActive({ all: false, vn: true, qt: false });
    };
    const getQT = () => {
        setNewMusics(newMusicQT);
        setActive({ all: false, vn: false, qt: true });
    };
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
            <div className={cx('top-music')}>
                <h3 className={cx('title')}>Mới phát hành</h3>
                <div className={cx('control')}>
                    <div className={cx('button')}>
                        <button className={cx('btn', { active: active.all })} onClick={getAll}>
                            Tất cả
                        </button>
                        <button className={cx('btn', { active: active.vn })} onClick={getVN}>
                            Việt Nam
                        </button>
                        <button className={cx('btn', { active: active.qt })} onClick={getQT}>
                            Quốc Tế
                        </button>
                    </div>
                    <div className={cx('navigation')}>
                        <p className={cx('text')}>Tất cả</p>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </div>
                </div>
                <div className={cx('list')}>
                    {newMusics.map((music, index) => {
                        return (
                            <div key={index} className={cx('item')}>
                                <MusicItemSmall music={music} />
                            </div>
                        );
                    })}
                </div>
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
            {thirtTopic && (
                <div className={cx('list-music')}>
                    <ListMusic title={thirtTopic.title} music={thirtTopic.musicInfo} />
                </div>
            )}
        </div>
    );
}
export default Home;
