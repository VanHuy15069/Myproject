import classNames from 'classnames/bind';
import styles from './SingerMusic.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function SingerMusic() {
    const params = useParams();
    const navigate = useNavigate();
    const boxRef = useRef();
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Nổi bật');
    const [singer, setSinger] = useState({});
    const [musics, setNewMusics] = useState([]);
    const [sort, setSort] = useState('views');
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
            .get(`http://localhost:4000/api/music/getBySinger/${params.id}`, {
                params: {
                    name: sort,
                },
            })
            .then((res) => {
                setNewMusics(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [params.id, navigate, sort]);
    const handleShowBox = () => {
        setShow(!show);
    };
    const handleSortView = () => {
        setText('Nổi bật');
        setSort('views');
        setShow(false);
    };
    const handleSortCreatedAt = () => {
        setText('Mới nhất');
        setSort('createdAt');
        setShow(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) setShow(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('singer')}>{singer.singerName} - Tất Cả Bài Hát</div>
                <div className={cx('sort')} onClick={handleShowBox} ref={boxRef}>
                    <FontAwesomeIcon icon={faArrowUpWideShort} />
                    <p>{text}</p>
                    {show ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                    {show && (
                        <div className={cx('box')} onClick={(e) => e.stopPropagation()}>
                            <div className={cx('item')} onClick={handleSortView}>
                                Nổi bật
                            </div>
                            <div className={cx('item')} onClick={handleSortCreatedAt}>
                                Mới nhất
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <p>Bài hát</p>
                    <p>Phát hành</p>
                    <p>Thời gian</p>
                </div>
                <div className={cx('list-music')}>
                    {musics.map((music, index) => {
                        return (
                            <div key={index} className={cx('item-music')}>
                                <MusicOfSinger music={music} time list={musics} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default SingerMusic;
