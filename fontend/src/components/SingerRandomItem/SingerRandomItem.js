import classNames from 'classnames/bind';
import styles from './SingerRandomItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function SingerRandomItem({ singer }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [follow, setFollow] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        if (user && singer.id) {
            axios
                .get('http://localhost:4000/api/follow/isFollow', { params: { userId: user.id, singerId: singer.id } })
                .then((res) => {
                    setIsFollow(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [singer.id, user, navigate]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/follow/countFollow/${singer.id}`)
            .then((res) => {
                setFollow(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [singer.id, navigate]);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Link to={`/singer/${singer.id}`}>
                <div className={cx('avata')} onClick={handleClick}>
                    <img className={cx('img')} src={`http://localhost:4000/src/${singer.image}`} alt="" />
                </div>
            </Link>
            <div className={cx('info')}>
                <Link to={`/singer/${singer.id}`}>
                    <div className={cx('name')} onClick={handleClick}>
                        {singer.singerName}
                    </div>
                </Link>
                <div className={cx('follow')}>{follow < 1000 ? follow : Math.floor(follow / 1000) + 'K'} quan tâm</div>
            </div>
            <div className={cx('btn')}>
                {isFollow ? (
                    <button className={cx('follow-btn', 'followed')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        Đã quan tâm
                    </button>
                ) : (
                    <button className={cx('follow-btn')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        Quan tâm
                    </button>
                )}
            </div>
        </div>
    );
}
export default SingerRandomItem;
