import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderProfile from '~/components/HeaderProfile/HeaderProfile';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import ListSinger from '~/components/ListSinger/ListSinger';
const cx = classNames.bind(styles);
function Singer() {
    const params = useParams();
    const navigate = useNavigate();
    const [singer, setSinger] = useState({});
    const [singerRandom, setSingerRandom] = useState([]);
    const [newMusic, setNewMusic] = useState({});
    const [outstandingMusic, setOutstandingMusic] = useState([]);
    const [follow, setFollow] = useState(0);
    let formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/follow/countFollow/${singer.id}`)
            .then((res) => {
                setFollow(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [singer.id, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/singer/singerInfor/${params.id}`)
            .then((res) => {
                setSinger(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, params.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/singer/randomSinger/${params.id}`, {
                params: { limit: 5 },
            })
            .then((res) => {
                setSingerRandom(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getBySinger/${params.id}`, {
                params: {
                    limit: 1,
                    name: 'createdAt',
                },
            })
            .then((res) => {
                setNewMusic(res.data.response.rows[0]);
            })
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getBySinger/${params.id}`, {
                params: {
                    limit: 6,
                    name: 'views',
                },
            })
            .then((res) => {
                setOutstandingMusic(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderProfile singer={singer} />
            </div>
            <div className={cx('container')}>
                {newMusic && Object.keys(newMusic).length > 0 && (
                    <div className={cx('new')}>
                        <div className={cx('title')}>Mới phát hành</div>

                        <div className={cx('content')}>
                            <div className={cx('image-box')}>
                                <img className={cx('img')} src={`http://localhost:4000/src/${newMusic.image}`} alt="" />
                            </div>
                            <div className={cx('music-info')}>
                                <div className={cx('name')}>{newMusic.musicName}</div>
                                <p className={cx('singer')}>{newMusic.singerInfo.singerName}</p>
                                <p className={cx('time')}>{formatDate.format(Date.parse(newMusic.createdAt))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {outstandingMusic.length > 0 && (
                    <div className={cx('outstanding')}>
                        <div className={cx('heading')}>
                            <div className={cx('outstanding-title')}>Bài hát nổi bật</div>
                            <div className={cx('navigation')}>
                                <p className={cx('text')}>Tất cả</p>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('list-music')}>
                            {outstandingMusic.map((music, index) => {
                                return (
                                    <div key={index} className={cx('item')}>
                                        <MusicOfSinger music={music} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('list-singer')}>
                <ListSinger singer={singerRandom} />
            </div>
            <div className={cx('info')}>
                <div className={cx('title')}>Về {singer.singerName}</div>
                <div className={cx('content-desc')}>
                    {singer.image && (
                        <div className={cx('image')}>
                            <img className={cx('img')} src={`http://localhost:4000/src/${singer.image}`} alt="" />
                        </div>
                    )}
                    <div className={cx('right-content')}>
                        <div className={cx('desc')}>{singer.description}</div>
                        <div className={cx('follow')}>{follow}</div>
                        <p className={cx('desc')}>Người quan tâm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Singer;
