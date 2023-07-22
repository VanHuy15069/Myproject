import classNames from 'classnames/bind';
import styles from './MusicItemHome.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function MusicItemHome({ song, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')} onClick={onClick}>
                <img className={cx('img')} src={`http://localhost:4000/src/${song.image}`} alt="" />
            </div>
            <div className={cx('content')}>
                <p className={cx('title')} onClick={onClick}>
                    {song.musicName}
                </p>
                <Link to={`/singer/${song.singerInfo.id}`}>
                    <p className={cx('singer')}>{song.singerInfo.singerName}</p>
                </Link>
            </div>
        </div>
    );
}
export default MusicItemHome;
