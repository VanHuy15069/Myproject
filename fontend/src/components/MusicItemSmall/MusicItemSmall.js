import classNames from 'classnames/bind';
import styles from './MusicItemSmall.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function MusicItemSmall({ music }) {
    let formatDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={`http://localhost:4000/src/${music.image}`} alt="" />
            <div className={cx('content')}>
                <div className={cx('title')}>
                    <p className={cx('name')}>{music.musicName}</p>
                    {music.vip && <div className={cx('vip')}>vip</div>}
                </div>
                <Link to={`/singer/${music.singerInfo.id}`}>
                    <p className={cx('text', 'singer')}>{music.singerInfo.singerName}</p>
                </Link>
                <p className={cx('text')}>{formatDate.format(Date.parse(music.createdAt))}</p>
            </div>
        </div>
    );
}
export default MusicItemSmall;
