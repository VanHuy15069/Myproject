import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HeaderProfile from '~/components/HeaderProfile/HeaderProfile';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import ListSinger from '~/components/ListSinger/ListSinger';
const cx = classNames.bind(styles);
function Singer() {
    const params = useParams();
    const navigate = useNavigate();
    const [isRender, setIsRender] = useContext(Context);
    const [singer, setSinger] = useState({});
    const [singerRandom, setSingerRandom] = useState([]);
    const [newMusic, setNewMusic] = useState({});
    const [outstandingMusic, setOutstandingMusic] = useState([]);
    const [follow, setFollow] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isFollow, setIsFollow] = useState(false);
    const [render, setRender] = useState(false);
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
    }, [singer.id, navigate, render]);
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
    useEffect(() => {
        if (user && singer.id) {
            axios
                .get('http://localhost:4000/api/follow/isFollow', { params: { userId: user.id, singerId: singer.id } })
                .then((res) => {
                    setIsFollow(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [render, singer.id, user, navigate]);
    const handleAddFollows = () => {
        if (user) {
            axios
                .post('http://localhost:4000/api/follow/addFollow', { singerId: singer.id, userId: user.id })
                .then(() => {
                    setRender(!render);
                })
                .catch(() => navigate('/error'));
        } else {
            navigate('/login');
        }
    };
    const handleUnFollows = () => {
        axios
            .delete('http://localhost:4000/api/follow/delete', { params: { userId: user.id, singerId: singer.id } })
            .then(() => {
                setRender(!render);
            })
            .catch((err) => console.log(err));
    };
    const handleAddSongNew = (song) => {
        const newList = [...outstandingMusic];
        const index = outstandingMusic.findIndex((obj) => obj.id === song.id);
        if (index !== -1) {
            const afterList = newList.slice(index);
            newList.splice(index, newList.length - index);
            const listMusic = afterList.concat(newList);
            localStorage.setItem('listMusic', JSON.stringify(listMusic));
        } else {
            newList.unshift(song);
            localStorage.setItem('listMusic', JSON.stringify(newList));
        }
        setIsRender(!isRender);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderProfile
                    singer
                    image={singer.image}
                    isFollow={isFollow}
                    name={singer.singerName}
                    follows={follow}
                    ClickUnFollows={handleUnFollows}
                    ClickAddFollows={handleAddFollows}
                />
            </div>
            <div className={cx('container')}>
                {newMusic && Object.keys(newMusic).length > 0 && (
                    <div className={cx('new')}>
                        <div className={cx('title')}>Mới phát hành</div>
                        <div className={cx('content')} onClick={() => handleAddSongNew(newMusic)}>
                            <div className={cx('image-box')}>
                                {newMusic.image && (
                                    <img
                                        className={cx('img')}
                                        src={`http://localhost:4000/src/${newMusic.image}`}
                                        alt=""
                                    />
                                )}
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
                            <Link to={`/singer/${params.id}/song`}>
                                <div className={cx('navigation')}>
                                    <p className={cx('text')}>Tất cả</p>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('list-music')}>
                            {outstandingMusic.map((music, index) => {
                                return (
                                    <div key={index} className={cx('item')}>
                                        <MusicOfSinger music={music} list={outstandingMusic} />
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
