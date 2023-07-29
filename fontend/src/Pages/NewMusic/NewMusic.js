import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import { Context } from '~/Provider/Provider';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function NewMusic() {
    const navigate = useNavigate();
    const [isRender, setIsRender] = useContext(Context);
    const [musics, setMusics] = useState([]);
    const [newMusicAll, setNewMusicAll] = useState([]);
    const [nation, setNation] = useState('Việt Nam');
    const [active, setActive] = useState({
        all: true,
        vi: false,
        usuk: false,
        korea: false,
    });
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getMusicOfNation', {
                params: {
                    nationName: nation,
                    limit: 100,
                },
            })
            .then((res) => {
                setMusics(res.data.response[0].musicInfo);
            })
            .catch(() => nation('/error'));
    }, [nation, navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getAllMusic', {
                params: {
                    limit: 100,
                    name: 'createdAt',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setNewMusicAll(res.data.response);
            })
            .catch(() => navigate('error'));
    }, [navigate]);
    const handleAddSong = (song, musics) => {
        const newList = [...musics];
        const index = musics.indexOf(song);
        const afterList = newList.slice(index);
        newList.splice(index, newList.length - index);
        const listMusic = afterList.concat(newList);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    const getAll = () => {
        setActive({
            all: true,
            vi: false,
            usuk: false,
            korea: false,
        });
    };
    const getVn = () => {
        setNation('Việt Nam');
        setActive({
            all: false,
            vi: true,
            usuk: false,
            korea: false,
        });
    };
    const getUSUK = () => {
        setNation('Âu Mỹ');
        setActive({
            all: false,
            vi: false,
            usuk: true,
            korea: false,
        });
    };
    const getKorea = () => {
        setNation('Hàn Quốc');
        setActive({
            all: false,
            vi: false,
            usuk: false,
            korea: true,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Mới Phát Hành</div>
            <div className={cx('line')}></div>
            <div className={cx('option')}>
                <div className={cx('btn', { active: active.all })} onClick={getAll}>
                    Tất cả
                </div>
                <div className={cx('btn', { active: active.vi })} onClick={getVn}>
                    Việt Nam
                </div>
                <div className={cx('btn', { active: active.usuk })} onClick={getUSUK}>
                    Âu Mỹ
                </div>
                <div className={cx('btn', { active: active.korea })} onClick={getKorea}>
                    Hàn Quốc
                </div>
            </div>
            <div className={cx('header')}>
                <p>Bài hát</p>
                <p>Phát hành</p>
                <p>Thời gian</p>
            </div>
            <div className={cx('container')}>
                {active.all ? (
                    <div className={cx('list')}>
                        {newMusicAll.map((music, index) => {
                            return (
                                <MusicOfSinger
                                    key={index}
                                    music={music}
                                    time
                                    onClick={() => handleAddSong(music, musics)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className={cx('list')}>
                        {musics.map((music, index) => {
                            return (
                                <MusicOfSinger
                                    key={index}
                                    music={music}
                                    time
                                    onClick={() => handleAddSong(music, musics)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
export default NewMusic;
