import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListMusic from '~/components/ListMusic/ListMusic';
import MusicOfSinger from '~/components/MusicOfSinger/MusicOfSinger';
const cx = classNames.bind(styles);
function CategoryItem() {
    const params = useParams();
    const navigate = useNavigate();
    const [newMusics, setNewMusics] = useState([]);
    const [hotSongs, setHotSongs] = useState([]);
    const [category, setCategory] = useState({});
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/category/getOne/${params.id}`)
            .then((res) => setCategory(res.data.response))
            .catch(() => navigate('/error'));
    }, [params.id, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getByCategory/${params.id}`, {
                params: {
                    limit: 5,
                    name: 'createdAt',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setNewMusics(res.data.response.rows);
            })
            .catch((err) => console.log(err));
    }, [params.id]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/music/getByCategory/${params.id}`, {
                params: {
                    limit: 15,
                    name: 'views',
                    sort: 'DESC',
                },
            })
            .then((res) => {
                setHotSongs(res.data.response.rows);
            })
            .catch((err) => console.log(err));
    }, [params.id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                {category.image && <img src={`http://localhost:4000/src/${category.image}`} alt="" />}
            </div>
            <div className={cx('container')}>
                <div className={cx('list')}>
                    <ListMusic music={newMusics} title={'Mới Nhất'} />
                </div>
                <div className={cx('list')}>
                    <div className={cx('title')}>Hot songs</div>
                    <div className={cx('hot-songs')}>
                        {hotSongs.map((song, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <MusicOfSinger music={song} list={hotSongs} hotSong />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoryItem;
