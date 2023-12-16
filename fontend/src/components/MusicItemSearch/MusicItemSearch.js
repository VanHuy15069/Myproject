import classNames from 'classnames/bind';
import styles from './MusicItemSearch.module.scss';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlay, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '~/Provider/Provider';
import PlayIcon from '../PlayIcon/PlayIcon';
import axios from 'axios';
import BoxMSG from '../BoxMSG/BoxMSG';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
const cx = classNames.bind(styles);
function MusicItemSearch({ music, list }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isRender, setIsRender, , , renderFavorite, setRenderFavorite, songId, , isPlay, setIsPlay] =
        useContext(Context);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [msg, setMsg] = useState('');
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
        if (user) {
            axios
                .get('http://localhost:4000/api/favorite/isFavorite', {
                    params: {
                        userId: user.id,
                        musicId: music.id,
                    },
                })
                .then((res) => setIsFavorite(res.data.response))
                .catch(() => navigate('/error'));
        }
        // eslint-disable-next-line
    }, [navigate, music.id, renderFavorite]);
    const handleAddSong = (music) => {
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
                    console.log(res.data.response);
                    localStorage.setItem('user', JSON.stringify(res.data.response));
                })
                .catch(() => navigate('/error'));
        } else navigate('/login');
    };
    return (
        <div
            className={cx('wrap-music', {
                active: music.id === songId && isPlay,
            })}
            onClick={() => handleAddSong(music)}
        >
            <div className={cx('img')}>
                <img src={`http://localhost:4000/src/${music.image}`} alt="" />
                <div className={cx('overlay')}>
                    {music.id === songId && isPlay ? (
                        <div className={cx('play')} onClick={() => setIsPlay(false)}>
                            <PlayIcon />
                        </div>
                    ) : (
                        <span className={cx('pause')} onClick={() => setIsPlay(true)}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    )}
                </div>
            </div>
            <div className={cx('info')}>
                <p className={cx('music-title')}>Bài hát</p>
                <p className={cx('music-name')}>{music.musicName}</p>
                <p
                    className={cx('singer-name')}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/singer/${music.singerInfo.id}`);
                    }}
                >
                    {music.singerInfo.singerName}
                </p>
            </div>
            <div className={cx('action')}>
                <div className={cx('action-icon')}>
                    {isFavorite ? (
                        <span className={cx('icon-item', 'added')} onClick={handleUnFavorite}>
                            <FontAwesomeIcon icon={heartSolid} />
                        </span>
                    ) : (
                        <span className={cx('icon-item')} onClick={handleAddFavorite}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    )}
                </div>
                <div className={cx('action-icon')}>
                    <span className={cx('icon-item')} onClick={handleDownLoad}>
                        <FontAwesomeIcon icon={faDownload} />
                    </span>
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
export default MusicItemSearch;
