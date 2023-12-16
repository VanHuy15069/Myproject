import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { saveAs } from 'file-saver';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HeaderProfile from '~/components/HeaderProfile/HeaderProfile';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHeart as heartSolid, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import ListSinger from '~/components/ListSinger/ListSinger';
import PlayIcon from '~/components/PlayIcon/PlayIcon';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import PoperWrapper from '~/components/PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function Singer() {
    const params = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [msg, setMsg] = useState('');
    const [singer, setSinger] = useState({});
    const [singerRandom, setSingerRandom] = useState([]);
    const [newMusic, setNewMusic] = useState({});
    const [outstandingMusic, setOutstandingMusic] = useState([]);
    const [follow, setFollow] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    const [render, setRender] = useState(false);
    let formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    useEffect(() => {
        if (newMusic) {
            if (user && newMusic.id) {
                axios
                    .get('http://localhost:4000/api/favorite/isFavorite', {
                        params: {
                            userId: user.id,
                            musicId: newMusic.id,
                        },
                    })
                    .then((res) => setIsFavorite(res.data.response))
                    .catch(() => navigate('/error'));
            }
        }
        // eslint-disable-next-line
    }, [navigate, renderFavorite, newMusic]);
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
        let limit = 5;
        if (window.innerWidth <= 1231) limit = 4;
        axios
            .get(`http://localhost:4000/api/singer/randomSinger/${params.id}`, {
                params: { limit: limit },
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
        let limit = 6;
        if (window.innerWidth <= 1231) limit = 3;
        axios
            .get(`http://localhost:4000/api/music/getBySinger/${params.id}`, {
                params: {
                    limit: limit,
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
        // eslint-disable-next-line
    }, [render, singer.id, navigate]);
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
        if (user) {
            if (song.vip) {
                if (user.vip) {
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
                } else {
                    setShowBox(true);
                }
            } else {
                if (user.vip) {
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
                } else {
                    if (index !== -1) {
                        const afterList = newList.slice(index);
                        newList.splice(index, newList.length - index);
                        const listMusic = afterList.concat(newList);
                        const musicsNotVip = listMusic.filter((item) => item.vip === false);
                        localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
                    } else {
                        const musicsNotVip = newList.filter((item) => item.vip === false);
                        musicsNotVip.unshift(song);
                        localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
                    }
                    setIsRender(!isRender);
                }
            }
        } else {
            if (song.vip) {
                setShowBox(true);
            } else {
                if (index !== -1) {
                    const afterList = newList.slice(index);
                    newList.splice(index, newList.length - index);
                    const listMusic = afterList.concat(newList);
                    const musicsNotVip = listMusic.filter((item) => item.vip === false);
                    localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
                } else {
                    const musicsNotVip = newList.filter((item) => item.vip === false);
                    musicsNotVip.unshift(song);
                    localStorage.setItem('listMusic', JSON.stringify(musicsNotVip));
                }
                setIsRender(!isRender);
            }
        }
    };
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: newMusic.id })
                .then(() => {
                    setRenderFavorite(!renderFavorite);
                    setShowMSG(true);
                    setMsg('Đã thêm bài hát vào thư viện');
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    const handleUnFavorite = (e) => {
        e.stopPropagation();
        axios
            .delete('http://localhost:4000/api/favorite/delete', {
                params: {
                    userId: user.id,
                    musicId: newMusic.id,
                },
            })
            .then(() => {
                setRenderFavorite(!renderFavorite);
                setShowMSG(true);
                setMsg('Đã xóa bài hát khỏi vào thư viện');
            })
            .catch(() => navigate('/error'));
    };
    const handleDownLoad = (e) => {
        e.stopPropagation();
        const src = `http://localhost:4000/src/${newMusic.musicLink}`;
        const fileName = `${newMusic.musicName}.mp3`;
        if (newMusic.vip) {
            if (user) {
                if (user.vip) {
                    saveAs(src, fileName);
                    if (!isFavorite) {
                        axios
                            .post('http://localhost:4000/api/favorite/addFavorite', {
                                userId: user.id,
                                musicId: newMusic.id,
                            })
                            .then(() => {
                                setRenderFavorite(!renderFavorite);
                            })
                            .catch(() => navigate('/error'));
                    }
                } else {
                    setShowBox(true);
                }
            } else setShowBox(true);
        } else {
            saveAs(src, fileName);
            if (!isFavorite) {
                axios
                    .post('http://localhost:4000/api/favorite/addFavorite', {
                        userId: user.id,
                        musicId: newMusic.id,
                    })
                    .then(() => {
                        setRenderFavorite(!renderFavorite);
                    })
                    .catch(() => navigate('/error'));
            }
        }
    };
    const handleUpgrade = () => {
        if (user) {
            axios
                .patch(`http://localhost:4000/api/user/upgrade/${user.id}`)
                .then((res) => {
                    setShowBox(false);
                    setShowMSG(true);
                    setMsg('Tài khoản đã được nâng cấp');
                    console.log(res.data.response);
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
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
                        <div
                            className={cx('content', { active: newMusic.id === songId && isPlay })}
                            onClick={() => handleAddSongNew(newMusic)}
                        >
                            <div className={cx('image-box')}>
                                {newMusic.image && (
                                    <img
                                        className={cx('img')}
                                        src={`http://localhost:4000/src/${newMusic.image}`}
                                        alt=""
                                    />
                                )}
                                <div className={cx('overlay')}>
                                    <div className={cx('favorite')}>
                                        {isFavorite ? (
                                            <span className={cx('heart', 'added')} onClick={handleUnFavorite}>
                                                <FontAwesomeIcon icon={heartSolid} />
                                            </span>
                                        ) : (
                                            <span className={cx('heart')} onClick={handleAddFavorite}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('play')}>
                                        {songId === newMusic.id && isPlay ? (
                                            <div className={cx('play-icon')} onClick={() => setIsPlay(false)}>
                                                <PlayIcon />
                                            </div>
                                        ) : (
                                            <span className={cx('pause')} onClick={() => setIsPlay(true)}>
                                                <FontAwesomeIcon icon={faCirclePlay} />
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('download')} onClick={handleDownLoad}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </div>
                                </div>
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
                <ListSinger singer={singerRandom} title={'Bạn có thể thích'} />
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
            {showMSG && (
                <div
                    className={cx('msg')}
                    onClick={(e) => {
                        setShowMSG(false);
                        e.stopPropagation();
                    }}
                >
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBox && <PoperWrapper onClickHide={() => setShowBox(false)} onClickBtn={handleUpgrade} />}
        </div>
    );
}
export default Singer;
