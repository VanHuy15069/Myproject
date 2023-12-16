import classNames from 'classnames/bind';
import styles from './MusicOfSinger.module.scss';
import { useNavigate } from 'react-router-dom';
import { Context } from '~/Provider/Provider';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import { saveAs } from 'file-saver';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicOfSinger({ music, time = false, favorite = false, index, list, hotSong = false }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isHeart, setIsHeart] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId] = useContext(Context);
    const formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const handleLoad = (e) => {
        const audio = e.target;
        const audioDuration = audio.duration;
        if (!isNaN(audioDuration)) {
            setMinute(Math.floor(audioDuration / 60));
            setSecond(Math.round(audioDuration % 60));
        }
    };
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
        if (user !== null) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: music.id,
                    },
                })
                .then((res) => setIsHeart(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [navigate, music.id, renderFavorite]);
    const handleAddSong = () => {
        const newList = [...list];
        if (user !== null) {
            if (music.vip) {
                if (user.vip) {
                    const index = list.indexOf(music);
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
                    const index = list.indexOf(music);
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
    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (user) {
            axios
                .post('http://localhost:4000/api/favorite/addFavorite', { userId: user.id, musicId: music.id })
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
                    musicId: music.id,
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
        const src = `http://localhost:4000/src/${music.musicLink}`;
        const fileName = `${music.musicName}.mp3`;
        if (music.vip) {
            if (user) {
                if (user.vip) {
                    saveAs(src, fileName);
                    if (!isHeart) {
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
            if (!isHeart) {
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
                    console.log(res.data.response);
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    return (
        <div
            className={cx('wrapper', { curentSong: songId === music.id, favorite: favorite, hotSong: hotSong })}
            onClick={handleAddSong}
        >
            {music.musicLink && (
                <audio src={`http://localhost:4000/src/${music.musicLink}`} onLoadedMetadata={handleLoad} />
            )}
            {index && (
                <span className={cx('number', { one: index === 1, two: index === 2, three: index === 3 })}>
                    {index}
                </span>
            )}
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('music-avata')}>
                        <div className={cx('image')}>
                            <img src={`http://localhost:4000/src/${music.image}`} alt="" />
                        </div>
                        <div className={cx('music-info')}>
                            <div className={cx('music-name')}>
                                <div className={cx('name')}>{music.musicName}</div>
                                {music.vip && <div className={cx('vip')}>Premium</div>}
                            </div>
                            <div
                                className={cx('singer', 'link-singer')}
                                onClick={(e) => {
                                    navigate(`/singer/${music.singerInfo.id}`);
                                    e.stopPropagation();
                                }}
                            >
                                {music.singerInfo.singerName}
                            </div>
                        </div>
                    </div>
                    {time && <div className={cx('time')}>{formatDate.format(Date.parse(music.createdAt))}</div>}
                    {favorite && (
                        <div className={cx('heart')}>
                            {isHeart ? (
                                <span className={cx('icon', 'added')} onClick={handleUnFavorite}>
                                    {<FontAwesomeIcon icon={heartSolid} />}
                                </span>
                            ) : (
                                <span className={cx('icon')} onClick={handleAddFavorite}>
                                    {<FontAwesomeIcon icon={faHeart} />}
                                </span>
                            )}
                        </div>
                    )}
                    <div className={cx('duration')}>
                        {minute >= 10 ? minute : '0' + minute}:{second >= 10 ? second : '0' + second}
                    </div>

                    <div className={cx('action')}>
                        {isHeart ? (
                            <span className={cx('icon', 'added')} onClick={handleUnFavorite}>
                                {<FontAwesomeIcon icon={heartSolid} />}
                            </span>
                        ) : (
                            <span className={cx('icon')} onClick={handleAddFavorite}>
                                {<FontAwesomeIcon icon={faHeart} />}
                            </span>
                        )}
                        <span className={cx('icon')} onClick={handleDownLoad}>
                            <FontAwesomeIcon icon={faDownload} />
                        </span>
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
export default MusicOfSinger;
