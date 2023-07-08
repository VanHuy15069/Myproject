import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';
import MusicItemHome from '../MusicItemHome/MusicItemHome';
import { Fragment } from 'react';
const cx = classNames.bind(styles);
function ListMusic({ music, title }) {
    return (
        <div className={cx('wrapper')}>
            {music && (
                <Fragment>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>{title}</h3>
                    </div>

                    <div className={cx('list')}>
                        {music.map((song, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <MusicItemHome song={song} />
                                </div>
                            );
                        })}
                    </div>
                </Fragment>
            )}
        </div>
    );
}
export default ListMusic;
