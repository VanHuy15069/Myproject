import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
const cx = classNames.bind(styles);
function MusicItem({ image, music, singer }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={image} alt="" />
            <div className={cx('content')}>
                <div className={cx('music')}>{music}</div>
                <div className={cx('singer')}>{singer}</div>
            </div>
        </div>
    );
}
export default MusicItem;
