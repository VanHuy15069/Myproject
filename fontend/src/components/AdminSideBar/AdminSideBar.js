import classNames from 'classnames/bind';
import styles from './AdminSideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpenText,
    faIcons,
    faImage,
    faList,
    faLocationDot,
    faMusic,
    faRectangleList,
    faStreetView,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AdminSideBar() {
    return (
        <div className={cx('wrapper')}>
            <NavLink to={'/admin'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faRectangleList} />
                    </span>
                    <p className={cx('text')}>Thống Kê</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/music'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faMusic} />
                    </span>
                    <p className={cx('text')}>Bài Hát</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/singer'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faStreetView} />
                    </span>
                    <p className={cx('text')}>Ca Sĩ</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/category'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faIcons} />
                    </span>
                    <p className={cx('text')}>Thể Loại</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/topics'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faList} />
                    </span>
                    <p className={cx('text')}>Chủ Đề</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/nation'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <p className={cx('text')}>Quốc Gia</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/slider'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <p className={cx('text')}>Slider</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/user'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <p className={cx('text')}>Người Dùng</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/contact'} end className={(nav) => cx({ active: nav.isActive })}>
                <div className={cx('menu-item')}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    </span>
                    <p className={cx('text')}>Phản Hồi</p>
                </div>
            </NavLink>
        </div>
    );
}
export default AdminSideBar;
