import classNames from 'classnames/bind';
import styles from './TopNewMusic.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function TopNewMusic() {
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getTopNewMusic', {
                params: {
                    limit: 100,
                    name: 'views',
                    sort: 'DESC',
                },
            })
            .then((res) => setMusics(res.data.response))
            .catch(() => navigate('/error'));
    }, [navigate]);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>BXH Nhạc Mới</h3>
            <div className={cx('container')}>
                {musics.map((music, index) => {
                    return <MusicOfSinger key={index} music={music} time index={index + 1} list={musics} />;
                })}
            </div>
        </div>
    );
}
export default TopNewMusic;
