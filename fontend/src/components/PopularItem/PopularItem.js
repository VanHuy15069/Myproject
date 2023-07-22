import classNames from 'classnames/bind';
import styles from './PopularItem.module.scss';
const cx = classNames.bind(styles);
function PopularItem({ image, desc, bold = false }) {
    return (
        <div className={cx('singer-item')}>
            <div className={cx('avata')}>
                <img className={cx('img')} src={image} alt="" />
            </div>
            <div className={cx('name', { bold })}>{desc}</div>
        </div>
    );
}
export default PopularItem;
