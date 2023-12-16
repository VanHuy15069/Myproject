import classNames from 'classnames/bind';
import styles from './AdminMusic.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMusic,
    faTrash,
    faPenToSquare,
    faEye,
    faUpload,
    faXmark,
    faSquareCaretUp,
    faSquareCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '~/components/Box/Box';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import axios from 'axios';
import Search from '~/components/Search/Search';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
function AdminMusic() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [option, setOption] = useState();
    const [showBox, setShowBox] = useState(false);
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [title, setTitle] = useState('');
    const [topics, setTopics] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nations, setNations] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [musicName, setMusicName] = useState('');
    const [singer, setSinger] = useState({});
    const [clear, setClear] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [imgUpload, setImgUpload] = useState();
    const [image, setImage] = useState();
    const [linkMusic, setLinkMusic] = useState();
    const [musicUpload, setMusicUpload] = useState();
    const [check, setCheck] = useState('');
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [musics, setMusics] = useState([]);
    const [render, setRender] = useState(false);
    const [id, setId] = useState();
    const [singers, setSingers] = useState([]);
    const [sort, setSort] = useState({ name: 'id', sort: 'ASC' });
    const [dataSelect, setDataSelcet] = useState({
        categoryId: '',
        topicId: '',
        nationId: '',
    });
    const { categoryId, topicId, nationId } = dataSelect;
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imgUpload);
            URL.revokeObjectURL(musicUpload);
        };
    }, [imgUpload, musicUpload]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/singer/getAll')
            .then((res) => {
                setSingers(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/music/getAllMusic', {
                params: { ...sort },
            })
            .then((res) => {
                setMusics(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, render, sort]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/topic/getAll')
            .then((res) => {
                setTopics(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/category/getCategory')
            .then((res) => {
                setCategories(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getAll')
            .then((res) => {
                setNations(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate]);
    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            setClear(false);
            setShowResult(false);
            return;
        }
        setClear(true);
        const timer = setTimeout(() => {
            axios
                .get('http://localhost:4000/api/singer/searchSinger', {
                    params: {
                        singerName: searchValue,
                        limit: 4,
                    },
                })
                .then((res) => {
                    setSearchResult(res.data.response.rows);
                    if (res.data.response.count === 0 || inputRef.current !== document.activeElement)
                        setShowResult(false);
                    else setShowResult(true);
                })
                .catch(() => navigate('/error'));
        }, 500);
        return () => clearInterval(timer);
    }, [searchValue, navigate]);
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) setShowResult(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleChangeSinger = (e) => {
        setSearchValue(e.target.value);
        const keyToFind = 'singerName';
        singers.forEach((singer) => {
            if (singer.hasOwnProperty(keyToFind) && singer[keyToFind] === e.target.value) {
                setSinger(singer);
            } else {
                setSinger({});
            }
        });
    };
    const handleChangeMusic = (e) => {
        setMusicName(e.target.value);
    };
    const handleShowAdd = () => {
        setOption(1);
        setShowBox(true);
        setTitle('Thêm Bài Hát');
        setSinger({});
        setMusicName('');
        setImage();
        setImgUpload();
        setLinkMusic();
        setMusicUpload();
        setSearchValue('');
        setDataSelcet({ categoryId: categories[0].id, topicId: topics[0].id, nationId: nations[0].id });
    };
    const handleCancle = () => {
        setShowBox(false);
        setImgUpload();
        setDataSelcet({ categoryId: categories[0].id, topicId: topics[0].id, nationId: nations[0].id });
        setMusicName('');
        setSearchValue('');
        setMusicUpload('');
        setSinger({});
        setCheck('');
    };
    const handleClickSinger = (data) => {
        setSearchValue(data.singerName);
        setShowResult(false);
        setSinger(data);
    };
    const handleFocus = () => {
        if (searchResult.length > 0) setShowResult(true);
    };
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    const handleChangeSelect = (e) => {
        setDataSelcet({ ...dataSelect, [e.target.name]: e.target.value });
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleChangeLink = (e) => {
        setLinkMusic(e.target.files[0]);
        setMusicUpload(e.target.files[0].name);
    };
    const handleShowDelete = (music) => {
        setId(music.id);
        setShowBoxDelete(true);
    };
    const handleShowUpdate = (music) => {
        setOption(2);
        setId(music.id);
        setShowBox(true);
        setDataSelcet({ categoryId: music.categoryId, topicId: music.topicId, nationId: music.nationId });
        setSinger(music.singerInfo);
        setSearchValue(music.singerInfo.singerName);
        setImgUpload(`http://localhost:4000/src/${music.image}`);
        setMusicUpload(music.musicLink);
        setMusicName(music.musicName);
        setImage();
        setLinkMusic();
        setTitle('Cập Nhật Bài Hát');
    };
    const handleVip = (musicId) => {
        axios
            .patch(`http://localhost:4000/api/music/upgrateVip/${musicId}`)
            .then(() => {
                setMsg('Cập nhật thành công');
                setShowMSG(true);
                setRender(!render);
            })
            .catch(() => navigate('/error'));
    };
    const handleMusic = () => {
        if (option === 1) {
            if (!musicName || !image || !linkMusic) setCheck('Bạn cần gửi đầy đủ thông tin!');
            else if (Object.keys(singer).length === 0) setCheck('Ca sĩ này không tồn tại trên hệ thống');
            else {
                const formData = new FormData();
                formData.append('musicName', musicName);
                formData.append('singerId', singer.id);
                formData.append('nationId', dataSelect.nationId);
                formData.append('topicId', dataSelect.topicId);
                formData.append('categoryId', dataSelect.categoryId);
                formData.append('image', image);
                formData.append('musicLink', linkMusic);
                axios
                    .post('http://localhost:4000/api/music/addMusic', formData)
                    .then(() => {
                        setShowBox(false);
                        toast.success("Đã thêm một bài hát!")
                        setImgUpload();
                        setMusicUpload();
                        setCheck('');
                        setImage();
                        setLinkMusic();
                        setDataSelcet({ categoryId: categories[0].id, topicId: topics[0].id, nationId: nations[0].id });
                        setRender(!render);
                        setSinger({});
                    })
                    .catch(() => navigate('/error'));
            }
        }
        if (option === 2) {
            if (!musicName) setCheck('Bạn cần gửi đầy đủ thông tin!');
            else if (Object.keys(singer).length === 0) setCheck('Ca sĩ này không tồn tại trên hệ thống');
            else {
                if (musicName && singer) {
                    axios
                        .put(`http://localhost:4000/api/music/${id}`, {
                            singerId: singer.id,
                            musicName: musicName,
                            ...dataSelect,
                        })
                        .then(() => {
                            setShowBox(false);
                            setCheck('');
                            setRender(!render);
                            toast.success("Bài hát đã được cập nhật!")
                            Swal.fire(
                                {
                                    title: 'Bài hát đã được cập nhật!',
                                    icon: 'success',
                                    width: 500,
                                    height: 400,
                                }
                              )
                            })
                        .catch((err) => console.log(err));
                }
                if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    axios
                        .patch(`http://localhost:4000/api/music/updateImage/${id}`, formData)
                        .then(() => {
                            setShowBox(false);
                            setCheck('');
                            setRender(!render);
                        })
                        .catch(() => navigate('/error'));
                }
                if (linkMusic) {
                    const formData = new FormData();
                    formData.append('musicLink', linkMusic);
                    axios
                        .patch(`http://localhost:4000/api/music/updateMusic/${id}`, formData)
                        .then(() => {
                            setShowMSG(true);
                            setMsg('Cập nhật bài hát thành công');
                            setShowBox(false);
                            setCheck('');
                            setRender(!render);
                        })
                        .catch(() => navigate('/error'));
                }
            }
        }
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/music/${id}`)
            .then(() => {
                setShowBoxDelete(false);
                setShowMSG(true);
                setMsg('Xoa bài hát thành công');
                setRender(!render);
            })
            .catch(() => navigate('/error'));
    };
    const handleSortID = () => {
        if (sort.name === 'id') {
            if (sort.sort === 'ASC') setSort({ ...sort, sort: 'DESC' });
            else setSort({ ...sort, sort: 'ASC' });
        } else setSort({ name: 'id', sort: 'ASC' });
    };
    const handleSortMusic = () => {
        if (sort.name === 'musicName') {
            if (sort.sort === 'ASC') setSort({ ...sort, sort: 'DESC' });
            else setSort({ ...sort, sort: 'ASC' });
        } else setSort({ name: 'musicName', sort: 'ASC' });
    };
    const handleSortViews = () => {
        if (sort.name === 'views') {
            if (sort.sort === 'ASC') setSort({ ...sort, sort: 'DESC' });
            else setSort({ ...sort, sort: 'ASC' });
        } else setSort({ name: 'views', sort: 'ASC' });
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin icon={faMusic} title={'Quản lý bài hát'} add onClick={handleShowAdd} />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th onClick={handleSortID}>ID</th>
                            <th className={cx('avata')}>Ảnh bìa</th>
                            <th onClick={handleSortMusic}>Tên bài hát</th>
                            <th>Ca sĩ</th>
                            <th onClick={handleSortViews}>Lượt views</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musics.map((music, index) => {
                            return (
                                <tr key={index}>
                                    <td>{music.id}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${music.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cx('col-name')}>
                                            <div className={cx('music-name')}>{music.musicName}</div>
                                            {music.vip && <div className={cx('vip')}>premium</div>}
                                        </div>
                                    </td>
                                    <td>{music.singerInfo.singerName}</td>
                                    <td>{music.views}</td>
                                    <td className={cx('control-col')}>
                                        <button className={cx('btn', 'btn-detail')}>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </span>
                                            Chi tiết
                                        </button>
                                        <button className={cx('btn', 'btn-pgrade')} onClick={() => handleVip(music.id)}>
                                            <span className={cx('icon')}>
                                                {music.vip ? (
                                                    <FontAwesomeIcon icon={faSquareCaretDown} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faSquareCaretUp} />
                                                )}
                                            </span>
                                            {music.vip ? 'Normal' : 'Upgrade'}
                                        </button>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowUpdate(music)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            Sửa
                                        </button>
                                        <button
                                            className={cx('btn', 'btn-delete')}
                                            onClick={() => handleShowDelete(music)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showBox && (
                <Box title={title} onclickCancle={handleCancle} onclickOK={handleMusic} check={check}>
                    <div className={cx('form-add')}>
                        <div className={cx('container')}>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Tên bài hát:</p>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    name="musicName"
                                    onChange={handleChangeMusic}
                                    value={musicName}
                                />
                            </div>

                            <div className={cx('item')}>
                                <p className={cx('text')}>Tên ca sĩ:</p>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    name="singerName"
                                    onChange={handleChangeSinger}
                                    value={searchValue}
                                    ref={inputRef}
                                    onFocus={handleFocus}
                                />
                                {clear && (
                                    <span className={cx('icon-X')} onClick={handleClear}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </span>
                                )}
                                {showResult && (
                                    <div className={cx('search')}>
                                        <Search singer={searchResult} onData={handleClickSinger} />
                                    </div>
                                )}
                            </div>

                            <div className={cx('item')}>
                                <p className={cx('text')}>Thể loại:</p>
                                <select
                                    onChange={handleChangeSelect}
                                    className={cx('input')}
                                    name="categoryId"
                                    value={categoryId}
                                >
                                    {categories.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>
                                                {category.categoryName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Chủ đề:</p>
                                <select
                                    onChange={handleChangeSelect}
                                    className={cx('input')}
                                    name="topicId"
                                    value={topicId}
                                >
                                    {topics.map((topic, index) => {
                                        return (
                                            <option key={index} value={topic.id}>
                                                {topic.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Quốc gia:</p>
                                <select
                                    onChange={handleChangeSelect}
                                    className={cx('input')}
                                    name="nationId"
                                    value={nationId}
                                >
                                    {nations.map((nation, index) => {
                                        return (
                                            <option key={index} value={nation.id}>
                                                {nation.nationName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Ảnh minh họa:</p>
                                <div className={cx('file')}>
                                    <input
                                        type="file"
                                        name="image"
                                        id="file"
                                        className={cx('inputfile')}
                                        onChange={handleChangeImage}
                                    />
                                    <label htmlFor="file">
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <span>Chọn file</span>
                                    </label>
                                    <img className={cx('img-upload')} alt="" src={imgUpload} />
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>File nhạc:</p>
                                <div className={cx('file')}>
                                    <input
                                        type="file"
                                        name="musicLink"
                                        id="music"
                                        className={cx('inputfile')}
                                        onChange={handleChangeLink}
                                    />
                                    <label htmlFor="music">
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <span>Chọn file</span>
                                    </label>
                                    {musicUpload && <p className={cx('file-name')}>{musicUpload}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            )}
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBoxDelete && (
                <BoxDelete
                    msg={'Xác nhấn xóa bài hát này'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
            <ToastContainer autoClose={3000} closeOnClick theme='dark'/>
        </div>
    );
}
export default AdminMusic;
