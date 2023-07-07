import classNames from 'classnames/bind';
import styles from './SingerItem.module.scss';
const cx = classNames.bind(styles);
function SingerItem({ image, singer, follow }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={image} alt="" />
            <div className={cx('content')}>
                <div className={cx('singer')}>{singer}</div>
                <div className={cx('follow')}>
                    <div className={cx('text')}>Ca sĩ</div>
                    <span className={cx('dot')}>•</span>
                    <div className={cx('text')}>{follow} quan tâm</div>
                </div>
            </div>
        </div>
    );
}
export default SingerItem;
