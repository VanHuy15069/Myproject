import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';
import MusicItemHome from '../MusicItemHome/MusicItemHome';
import { Fragment, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ListMusic({ music, title, navigation = false }) {
    const [isRender, setIsRender] = useContext(Context);
    const handleAddSong = (song) => {
        const newList = [...music];
        const index = music.indexOf(song);
        const afterList = newList.slice(index);
        newList.splice(index, newList.length - index);
        const listMusic = afterList.concat(newList);
        localStorage.setItem('listMusic', JSON.stringify(listMusic));
        setIsRender(!isRender);
    };
    return (
        <div className={cx('wrapper')}>
            {music && (
                <Fragment>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>{title}</h3>
                        {navigation && (
                            <div className={cx('navigation')}>
                                <p className={cx('text')}>Tất cả</p>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cx('list')}>
                        {music.map((song, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <MusicItemHome song={song} onClick={() => handleAddSong(song)} />
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
