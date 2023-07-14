import classNames from 'classnames/bind';
import styles from './MusicOfSinger.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function MusicOfSinger({ music }) {
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const handleLoad = (e) => {
        const audio = e.target;
        const audioDuration = audio.duration;
        if (!isNaN(audioDuration)) {
            setMinute(Math.floor(audioDuration / 60));
            setSecond(Math.round(audioDuration % 60));
        }
    };
    return (
        <div className={cx('wrapper')}>
            {music.musicLink && (
                <audio src={`http://localhost:4000/src/${music.musicLink}`} onLoadedMetadata={handleLoad} />
            )}
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img src={`http://localhost:4000/src/${music.image}`} alt="" />
                </div>
                <div className={cx('content')}>
                    <div className={cx('music-info')}>
                        <div className={cx('name')}>{music.musicName}</div>
                        <div className={cx('singer')}>{music.singerInfo.singerName}</div>
                    </div>
                    {music.musicLink && (
                        <div className={cx('duration')}>
                            {minute}:{second}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default MusicOfSinger;
