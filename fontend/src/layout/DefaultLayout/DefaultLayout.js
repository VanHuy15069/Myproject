import Header from '~/components/Header/header';
import SideBar from '~/components/SideBar/SideBar';
import Audio from '~/components/Audio/Audio';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <SideBar />
                </div>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Header />
                    </div>
                    <div className={cx('main')}>{children}</div>
                </div>
            </div>
            <div className={cx('audio')}>
                <Audio />
            </div>
        </div>
    );
}
export default DefaultLayout;
