import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeftLong,
    faArrowRightLong,
    faDownload,
    faGear,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userImg } from '~/Images';
import SettingBox from '../SettingBox/SettingBox';
import BoxUser from '../BoxUser/BoxUser';
const cx = classNames.bind(styles);
function Header() {
    const navigate = useNavigate();
    const [avata, setAvata] = useState(userImg);
    const [showBox, setShowBox] = useState(false);
    const [showBoxUser, setShowBoxUser] = useState(false);
    const [showBoxLogin, setShowBoxLogin] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user && user.image) {
            setAvata(`http://localhost:4000/src/${user.image}`);
        }
    }, [user]);
    const handleShow = () => {
        if (user) {
            setShowBoxUser(!showBoxUser);
        } else {
            setShowBoxLogin(!showBoxLogin);
        }
        setShowBox(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('navigation')}>
                    <span className={cx('icon-prev')} onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </span>
                    <span className={cx('icon-next')} onClick={() => navigate(+1)}>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </span>
                </div>
                <div className={cx('search')}>
                    <span className={cx('icon-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input type="text" className={cx('input')} placeholder="Tìm kiếm bài hát, nghệ sĩ,..." />
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('download')}>
                    <span className={cx('icon-download')}>
                        <FontAwesomeIcon icon={faDownload} />
                    </span>
                    <p>Tải bản Windows</p>
                </div>
                <div className={cx('icon-setting')}>
                    <span
                        className={cx('setting')}
                        onClick={() => {
                            setShowBox(!showBox);
                            setShowBoxUser(false);
                            setShowBoxLogin(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <div className={cx('setting-box')}>{showBox && <SettingBox />}</div>
                </div>
                <div className={cx('avata')}>
                    <img className={cx('user-image')} src={avata} alt="user" onClick={handleShow} />
                    {showBoxUser && user && (
                        <div className={cx('box-user')}>
                            <BoxUser user={user} />
                        </div>
                    )}
                    {showBoxLogin && !user && (
                        <div className={cx('box-login')}>
                            <div className={cx('btn-login')}>
                                <div className={cx('btn')} onClick={() => navigate('/login')}>
                                    Đăng nhập
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Header;