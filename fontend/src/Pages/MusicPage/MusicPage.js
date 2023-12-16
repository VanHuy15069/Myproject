import classNames from 'classnames/bind';
import styles from './MusicPage.module.scss';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPause, faPlay, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { faHeart, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import PlayIcon from '~/components/PlayIcon/PlayIcon';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import PoperWrapper from '~/components/PoperWrapper/PoperWrapper';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
import SingerRandomItem from '~/components/SingerRandomItem/SingerRandomItem';
import MusicItemHome from '~/components/MusicItemHome/MusicItemHome';
const cx = classNames.bind(styles);
function MusicPage() {
    const params = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [music, setMusic] = useState({});
    const [musicOfSinger, setMusicOfSinger] = useState([]);
    const [countFavorite, setCountFavorite] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [listMusic, setListMusic] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [reRender, setReRender] = useState(false);
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
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
        let limit = 4;
        if (window.innerWidth <= 1231) limit = 3;
        axios
            .get(`http://localhost:4000/api/music/getMusic/${params.id}`)
            .then((res) => {
                setMusic(res.data.response);
                axios
                    .get(`http://localhost:4000/api/music/getTheSameMusic/${params.id}`, {
                        params: {
                            limit: 20,
                            categoryId: res.data.response.categoryId,
                            topicId: res.data.response.topicId,
                        },
                    })
                    .then((res) => setListMusic(res.data.response))
                    .catch(() => navigate('/error'));
                axios
                    .get(`http://localhost:4000/api/music/getBySinger/${res.data.response.singerInfo.id}`, {
                        params: {
                            limit: limit,
                            name: 'views',
                            sort: 'DESC',
                        },
                    })
                    .then((res) => {
                        setMusicOfSinger(res.data.response.rows);
                    })
                    .catch(() => navigate('/error'));
            })
            .catch(() => navigate('/error'));
        // eslint-disable-next-line
    }, [params.id, navigate]);
    useEffect(() => {
        if (user && Object.keys(music).length > 0) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: params.id,
                    },
                })
                .then((res) => setIsFavorite(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [params.id, navigate, renderFavorite, music]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/favorite/countFavorite', {
                params: { musicId: params.id },
            })
            .then((res) => setCountFavorite(res.data.response.count))
            .catch(() => navigate('/error'));
    }, [params.id, navigate, reRender]);
    const handleAddSong = () => {
        const newList = [...listMusic];
        if (user) {
            if (music.vip) {
                if (user.vip) {
                    setIsPlay(!isPlay);
                } else {
                    setShowBox(true);
                }
            } else {
                if (songId === music.id) {
                    setIsPlay(!isPlay);
                } else setIsPlay(true);
                localStorage.setItem('listMusic', JSON.stringify(listMusic));
                setIsRender(!isRender);
            }
        } else {
            if (music.vip) {
                setShowBox(true);
            } else {
                if (songId === music.id) {
                    setIsPlay(!isPlay);
                } else setIsPlay(true);
                const musicNotVip = newList.filter((song) => song.vip === false);
                const index = musicNotVip.indexOf(music);
                const afterList = musicNotVip.slice(index);
                musicNotVip.splice(index, musicNotVip.length - index);
                const listMusic = afterList.concat(musicNotVip);
                localStorage.setItem('listMusic', JSON.stringify(listMusic));
                setIsRender(!isRender);
            }
        }
    };
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: music.id })
                .then(() => {
                    setRenderFavorite(!renderFavorite);
                    setShowMSG(true);
                    setReRender(!reRender);
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
                    musicId: music.id,
                },
            })
            .then(() => {
                setRenderFavorite(!renderFavorite);
                setShowMSG(true);
                setMsg('Đã xóa bài hát khỏi thư viện');
                setReRender(!reRender);
            })
            .catch(() => navigate('/error'));
    };
    const handleDownLoad = (e) => {
        e.stopPropagation();
        const src = `http://localhost:4000/src/${music.musicLink}`;
        const fileName = `${music.musicName}.mp3`;
        if (music.vip) {
            if (user) {
                if (user.vip) {
                    saveAs(src, fileName);
                    if (!isFavorite) {
                        axios
                            .post('http://localhost:4000/api/favorite/addFavorite', {
                                userId: user.id,
                                musicId: music.id,
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
                        musicId: music.id,
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
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    const handleAddMusic = (music) => {
        const newList = [...musicOfSinger];
        if (user !== null) {
            if (music.vip) {
                if (user.vip) {
                    const index = newList.indexOf(music);
                    const afterList = newList.slice(index);
                    newList.splice(index, newList.length - index);
                    const listMusic = afterList.concat(newList);
                    localStorage.setItem('listMusic', JSON.stringify(listMusic));
                    setIsRender(!isRender);
                } else {
                    setShowBox(true);
                }
            } else {
                if (user.vip) {
                    const index = newList.indexOf(music);
                    const afterList = newList.slice(index);
                    newList.splice(index, newList.length - index);
                    const listMusic = afterList.concat(newList);
                    localStorage.setItem('listMusic', JSON.stringify(listMusic));
                    setIsRender(!isRender);
                } else {
                    const musicNotVip = newList.filter((song) => song.vip === false);
                    const index = musicNotVip.indexOf(music);
                    const afterList = musicNotVip.slice(index);
                    musicNotVip.splice(index, musicNotVip.length - index);
                    const listMusic = afterList.concat(musicNotVip);
                    localStorage.setItem('listMusic', JSON.stringify(listMusic));
                    setIsRender(!isRender);
                }
            }
        } else {
            if (music.vip) {
                setShowBox(true);
            } else {
                const musicNotVip = newList.filter((song) => song.vip === false);
                const index = musicNotVip.indexOf(music);
                const afterList = musicNotVip.slice(index);
                musicNotVip.splice(index, musicNotVip.length - index);
                const listMusic = afterList.concat(musicNotVip);
                localStorage.setItem('listMusic', JSON.stringify(listMusic));
                setIsRender(!isRender);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('music-single')}>
                    <div className={cx('image', { active: isPlay && music.id === songId })} onClick={handleAddSong}>
                        {music.image && <img src={`http://localhost:4000/src/${music.image}`} alt="" />}
                        <div className={cx('overlay')}>
                            {isPlay && music.id === songId ? (
                                <div className={cx('play')}>
                                    <PlayIcon />
                                </div>
                            ) : (
                                <span className={cx('pause')}>
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('info')}>
                            <h3 className={cx('music-name')}>{music.musicName}</h3>
                            <div className={cx('singer')}>
                                {music.singerInfo && (
                                    <Link to={`/singer/${music.singerInfo.id}`} className={cx('singer-name')}>
                                        {music.singerInfo.singerName}
                                    </Link>
                                )}
                            </div>
                            <p className={cx('count-favorite')}>{countFavorite + ' người yêu thích'}</p>
                        </div>
                        <div className={cx('wrap-btn')}>
                            {isPlay && music.id === songId ? (
                                <button className={cx('button')} onClick={() => setIsPlay(false)}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPause} />
                                    </span>
                                    <p>Tạm dừng</p>
                                </button>
                            ) : (
                                <button className={cx('button')} onClick={handleAddSong}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </span>
                                    <p>Phát bài hát</p>
                                </button>
                            )}
                            <div className={cx('action')}>
                                <div className={cx('wrap-icon')}>
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
                                <div className={cx('wrap-icon')} onClick={handleDownLoad}>
                                    <span className={cx('icon-download')}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('list-music')}>
                    <div className={cx('header-list')}>
                        <p>Bài hát</p>
                        <p>Thời gian</p>
                    </div>
                    {listMusic.map((music, index) => {
                        return <MusicOfSinger key={index} music={music} list={listMusic} />;
                    })}
                </div>
            </div>
            {music.singerInfo && (
                <div className={cx('listOfSinger')}>
                    <div className={cx('title')}>Nhạc của {music.singerInfo.singerName}</div>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <SingerRandomItem singer={music.singerInfo} control={false} />
                        </div>
                        {musicOfSinger.map((song, index) => {
                            return (
                                <div className={cx('item')} key={index}>
                                    <MusicItemHome song={song} onClick={() => handleAddMusic(song)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
export default MusicPage;
