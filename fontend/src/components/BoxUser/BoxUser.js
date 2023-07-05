import classNames from 'classnames/bind';
import styles from './BoxUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCrown, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { userImg } from '~/Images';
import { useEffect, useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
const cx = classNames.bind(styles);
function BoxUser({ user }) {
    const [, setIsLogin] = useContext(Context);
    const [image, setImage] = useState(userImg);
    useEffect(() => {
        if (user.image) setImage(`http://localhost:4000/src/${user.image}`);
    }, [user]);
    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem('user');
        window.location.reload();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-wrapper')}>
                <div className={cx('user')}>
                    <div className={cx('avata')}>
                        <img src={image} alt="" />
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('user-name')}>
                            <p className={cx('name')}>{user.fullName}</p>
                            {user.vip && (
                                <span className={cx('icon-vip')}>
                                    <FontAwesomeIcon icon={faCrown} />
                                </span>
                            )}
                        </div>
                        {user.vip ? (
                            <div className={cx('box')}>Vip</div>
                        ) : (
                            <div className={cx('box', 'basic')}>Basic</div>
                        )}
                    </div>
                </div>
                {!user.vip && <div className={cx('upgrate')}>Nâng cấp tài khoản</div>}
            </div>
            <div className={cx('line')}></div>
            <div className={cx('user-setting')}>
                <div className={cx('title')}>Cá nhân</div>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('text')}>Thông tin cá nhân</p>
                </div>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faHeadphones} />
                    </span>
                    <p className={cx('text')}>Thư viện của bạn</p>
                </div>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('menu-item')} onClick={handleLogout}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
                <p className={cx('text')}>Đăng xuất</p>
            </div>
        </div>
    );
}
export default BoxUser;
