import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function NewMusic() {
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    const [newMusicAll, setNewMusicAll] = useState([]);
    const [nation, setNation] = useState('Việt Nam');
    const [active, setActive] = useState({
        all: true,
        vi: false,
        usuk: false,
        korea: false,
        china: false,
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
            china: false,
        });
    };
    const getUSUK = () => {
        setNation('Âu Mỹ');
        setActive({
            all: false,
            vi: false,
            usuk: true,
            korea: false,
            china: false,
        });
    };
    const getKorea = () => {
        setNation('Hàn Quốc');
        setActive({
            all: false,
            vi: false,
            usuk: false,
            korea: true,
            china: false,
        });
    };
    const getChina = () => {
        setNation('Trung Quốc');
        setActive({
            all: false,
            vi: false,
            usuk: false,
            korea: false,
            china: true,
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
                <div className={cx('btn', { active: active.china })} onClick={getChina}>
                    Trung Quốc
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
                            return <MusicOfSinger key={index} music={music} time list={newMusicAll} />;
                        })}
                    </div>
                ) : (
                    <div className={cx('list')}>
                        {musics.map((music, index) => {
                            return <MusicOfSinger key={index} music={music} time list={musics} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
export default NewMusic;
