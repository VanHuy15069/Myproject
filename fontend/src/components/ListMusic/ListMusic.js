import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';
import MusicItemHome from '../MusicItemHome/MusicItemHome';
import { Fragment, useContext } from 'react';
import { Context } from '~/Provider/Provider';
const cx = classNames.bind(styles);
function ListMusic({ music, title }) {
    const [isRender, setIsRender] = useContext(Context);
    const handleAddSong = (song) => {
        const newList = [...music];
        const index = music.indexOf(song);
        newList.splice(index, 1);
        newList.unshift(song);
        localStorage.setItem('listMusic', JSON.stringify(newList));
        setIsRender(!isRender);
    };
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
