import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';
import MusicItemHome from '../MusicItemHome/MusicItemHome';
import { Fragment, useContext, useState } from 'react';
import { Context } from '~/Provider/Provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PoperWrapper from '../PoperWrapper/PoperWrapper';
import BoxMSG from '../BoxMSG/BoxMSG';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function ListMusic({ music, title, navigation = false, onClick }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isRender, setIsRender] = useContext(Context);
    const [showBox, setShowBox] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const handleAddSong = (song) => {
        const newList = [...music];
        if (user !== null) {
            if (song.vip) {
                if (user.vip) {
                    const index = newList.indexOf(song);
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
                    const index = newList.indexOf(song);
                    const afterList = newList.slice(index);
                    newList.splice(index, newList.length - index);
                    const listMusic = afterList.concat(newList);
                    localStorage.setItem('listMusic', JSON.stringify(listMusic));
                    setIsRender(!isRender);
                } else {
                    const musicNotVip = newList.filter((song) => song.vip === false);
                    const index = musicNotVip.indexOf(song);
                    const afterList = musicNotVip.slice(index);
                    musicNotVip.splice(index, musicNotVip.length - index);
                    const listMusic = afterList.concat(musicNotVip);
                    localStorage.setItem('listMusic', JSON.stringify(listMusic));
                    setIsRender(!isRender);
                }
            }
        } else {
            if (song.vip) {
                setShowBox(true);
            } else {
                const musicNotVip = newList.filter((song) => song.vip === false);
                const index = musicNotVip.indexOf(song);
                const afterList = musicNotVip.slice(index);
                musicNotVip.splice(index, musicNotVip.length - index);
                const listMusic = afterList.concat(musicNotVip);
                localStorage.setItem('listMusic', JSON.stringify(listMusic));
                setIsRender(!isRender);
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
    return (
        <div className={cx('wrapper')}>
            {music && (
                <Fragment>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>{title}</h3>
                        {navigation && (
                            <div className={cx('navigation')} onClick={onClick}>
                                <p className={cx('text')}>Tất cả</p>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cx('list')}>
                        {music.map((song, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <MusicItemHome song={song} onClick={() => handleAddSong(song)} />
                                </div>
                            );
                        })}
                    </div>
                </Fragment>
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
export default ListMusic;
