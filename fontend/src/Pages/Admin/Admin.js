import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from '~/components/Chart/Chart';
import ChartCircel from '~/components/PieChart/PieChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);
function Admin() {
    const navigate = useNavigate();
    const date = new Date();
    const [users, setUsers] = useState(0);
    const [musics, setMusics] = useState(0);
    const [singers, setSingers] = useState(0);
    const [api, setApi] = useState('countNation');
    const [data, setData] = useState([]);
    const [topMusics, setTopMusics] = useState([]);
    const [statisticalMuiscs, setStatisticalMusics] = useState([]);
    const [month, setMonth] = useState(date.getMonth() + 1);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getAllMusic')
            .then((res) => setMusics(res.data.count))
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/singer/getAll')
            .then((res) => setSingers(res.data.count))
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user/getAll')
            .then((res) => setUsers(res.data.count))
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getMusicOfMonth', {
                params: { month: month },
            })
            .then((res) => setStatisticalMusics(res.data.response))
            .catch(() => navigate('/error'));
    }, [month, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/${api}`)
            .then((res) => {
                setData(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, api]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music//getTopMusic', {
                params: { limit: 5 },
            })
            .then((res) => setTopMusics(res.data.response))
            .catch(() => navigate('/error'));
    }, [navigate]);
    const handleChangeMonth = (e) => {
        if (date.getMonth() + 1 >= e.target.value) {
            setMonth(e.target.value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-cart')}>
                <div className={cx('item')}>
                    <Link to={'/admin/music'}>
                        <div className={cx('cart')}>
                            <h2>{musics} bài hát</h2>
                        </div>
                    </Link>
                </div>
                <div className={cx('item')}>
                    <Link to={'/admin/singer'}>
                        <div className={cx('cart', 'red')}>
                            <h2>{singers} ca sĩ</h2>
                        </div>
                    </Link>
                </div>
                <div className={cx('item')}>
                    <Link to={'/admin/user'}>
                        <div className={cx('cart', 'green')}>
                            <h2>{users} người dùng</h2>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('title')}>
                    <h3>Thống kê theo tháng</h3>
                    <select value={month} onChange={handleChangeMonth} className={cx('input')}>
                        <option value={1}>Tháng 1</option>
                        <option value={2}>Tháng 2</option>
                        <option value={3}>Tháng 3</option>
                        <option value={4}>Tháng 4</option>
                        <option value={5}>Tháng 5</option>
                        <option value={6}>Tháng 6</option>
                        <option value={7}>Tháng 7</option>
                        <option value={8}>Tháng 8</option>
                        <option value={9}>Tháng 9</option>
                        <option value={10}>Tháng 10</option>
                        <option value={11}>Tháng 11</option>
                        <option value={12}>Tháng 12</option>
                    </select>
                </div>
                <Chart data={statisticalMuiscs} />
            </div>
            <div className={cx('container')}>
                <div className={cx('pie-chart')}>
                    <div className={cx('header')}>
                        <div
                            className={cx('header-item', { active: api === 'countNation' })}
                            onClick={() => setApi('countNation')}
                        >
                            Quốc gia
                        </div>
                        <div
                            className={cx('header-item', { active: api === 'countTopic' })}
                            onClick={() => setApi('countTopic')}
                        >
                            Chủ đề
                        </div>
                        <div
                            className={cx('header-item', { active: api === 'countCategory' })}
                            onClick={() => setApi('countCategory')}
                        >
                            Thể loại
                        </div>
                    </div>
                    <ChartCircel data={data} />
                </div>
                <div className={cx('top-music')}>
                    <h3>Bài hát nổi bật</h3>
                    {topMusics.map((song, index) => {
                        return (
                            <div key={index} className={cx('music-item')}>
                                <div className={cx('info')}>
                                    <img className={cx('img')} src={`http://localhost:4000/src/${song.image}`} alt="" />
                                    <div className={cx('song-info')}>
                                        <p className={cx('music-name')}>{song.musicName}</p>
                                        <p>{song.singerName}</p>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <span className={cx('icon', 'views')}>
                                        <FontAwesomeIcon icon={faHeadphones} />
                                        <p>{song.views}</p>
                                    </span>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>{song.favorite}</p>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Admin;
