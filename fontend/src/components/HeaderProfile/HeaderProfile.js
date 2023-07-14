import classNames from 'classnames/bind';
import styles from './HeaderProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function HeaderProfile({ singer }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [follows, setFollows] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    const [render, setRender] = useState(false);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/follow/countFollow/${singer.id}`)
            .then((res) => {
                setFollows(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, singer.id, render]);
    useEffect(() => {
        if (user && singer.id) {
            axios
                .get('http://localhost:4000/api/follow/isFollow', { params: { userId: user.id, singerId: singer.id } })
                .then((res) => {
                    setIsFollow(res.data.response);
                })
                .catch(() => navigate('/error'));
        }
    }, [render, singer.id, user, navigate]);
    const handleAddFollows = () => {
        if (user) {
            axios
                .post('http://localhost:4000/api/follow/addFollow', { singerId: singer.id, userId: user.id })
                .then(() => {
                    setRender(!render);
                })
                .catch(() => navigate('/error'));
        } else {
            navigate('/login');
        }
    };
    const handleUnFollows = () => {
        axios
            .delete('http://localhost:4000/api/follow/delete', { params: { userId: user.id, singerId: singer.id } })
            .then(() => {
                setRender(!render);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                {singer.image && (
                    <img className={cx('background-img')} src={`http://localhost:4000/src/${singer.image}`} alt="" />
                )}
                <div className={cx('info')}>
                    <div className={cx('avata')}>
                        {singer.image && (
                            <img className={cx('avata-img')} src={`http://localhost:4000/src/${singer.image}`} alt="" />
                        )}
                    </div>
                    <div className={cx('content')}>
                        <h1 className={cx('name')}>{singer.singerName}</h1>
                        <div className={cx('follows')}>
                            <p className={cx('quantity')}>{follows} người quan tâm</p>
                            {isFollow ? (
                                <button className={cx('btn')} onClick={handleUnFollows}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <p className={cx('text')}>Đã quan tâm</p>
                                </button>
                            ) : (
                                <button className={cx('btn')} onClick={handleAddFollows}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </span>
                                    <p className={cx('text')}>Quan tâm</p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeaderProfile;
