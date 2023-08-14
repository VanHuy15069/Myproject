import classNames from 'classnames/bind';
import styles from './SingerItem.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function SingerItem({ image, singer, onClick }) {
    const navigate = useNavigate();
    const [follows, setFollows] = useState();
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/follow/countFollow/${singer.id}`)
            .then((res) => {
                setFollows(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, singer.id]);
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('img')} src={image} alt="" />
            <div className={cx('content')}>
                <div className={cx('singer')}>{singer.singerName}</div>
                <div className={cx('follow')}>
                    <div className={cx('text')}>Ca sĩ</div>
                    <span className={cx('dot')}>•</span>
                    <div className={cx('text')}>{follows} quan tâm</div>
                </div>
            </div>
        </div>
    );
}
export default SingerItem;
