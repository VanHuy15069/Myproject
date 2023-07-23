import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
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
import * as Image from '~/Images';
import PopularItem from '~/components/PopularItem/PopularItem';

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
    const [singerPopular, setSingerPopular] = useState([]);
    const [isRender, setIsRender] = useContext(Context);
    const [active, setActive] = useState({
        all: true,
        vn: false,
        qt: false,
    });
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/follow/getSingerPopular')
            .then((res) => {
                setSingerPopular(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
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
    const handleAddSong = (song) => {
        const newList = [...newMusics];
        const index = newMusics.indexOf(song);
        newList.splice(index, 1);
        newList.unshift(song);
        localStorage.setItem('listMusic', JSON.stringify(newList));
        setIsRender(!isRender);
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
                    <div className={cx('navigation')} onClick={() => navigate('/newMusic')}>
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
                                <MusicItemSmall music={music} onClick={() => handleAddSong(music)} />
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
            <div className={cx('singer')}>
                <div className={cx('title')}>Nghệ Sĩ Thịnh Hành</div>
                <div className={cx('list-singer')}>
                    {singerPopular.map((singer, index) => {
                        return (
                            <PopularItem
                                key={index}
                                image={`http://localhost:4000/src/${singer.singerInfo.image}`}
                                desc={`Top những bài hát hay nhất của ${singer.singerInfo.singerName}`}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={cx('rank')}>
                <div className={cx('rank-item')}>
                    <div className={cx('rank-img')}>
                        <img className={cx('image-rank')} src={Image.rankVN} alt="" />
                    </div>
                </div>
                <div className={cx('rank-item')}>
                    <div className={cx('rank-img')}>
                        <img className={cx('image-rank')} src={Image.rankUSUK} alt="" />
                    </div>
                </div>
                <div className={cx('rank-item')}>
                    <div className={cx('rank-img')}>
                        <img className={cx('image-rank')} src={Image.rankKPop} alt="" />
                    </div>
                </div>
            </div>
            <div className={cx('top100')}>
                <div className={cx('header-top100')}>
                    <div className={cx('title')}>Top 100</div>
                    <div className={cx('navigation')}>
                        <p className={cx('text')}>Tất cả</p>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </div>
                </div>
                <div className={cx('list-singer')}>
                    <PopularItem image={Image.top100NT} desc={'Top 100 nhạc trẻ hay nhất'} bold />
                    <PopularItem image={Image.top100USUK} desc={'Top 100 nhạc Âu Mỹ hay nhất'} bold />
                    <PopularItem image={Image.top100EDM} desc={'Top 100 nhạc EDM hay nhất'} bold />
                    <PopularItem image={Image.top100KPop} desc={'Top 100 nhạc K-Pop hay nhất'} bold />
                    <PopularItem image={Image.top100Violin} desc={'Top 100 nhạc Violin hay nhất'} bold />
                </div>
            </div>
        </div>
    );
}
export default Home;
