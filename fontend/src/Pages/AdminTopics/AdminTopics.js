import classNames from 'classnames/bind';
import styles from './AdminTopics.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faList, faPenToSquare, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '~/components/Box/Box';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
const cx = classNames.bind(styles);

function AdminTopics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [imgUpload, setImgUpload] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState('');
    const [render, setRender] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [msg, setMsg] = useState('');
    const [check, setCheck] = useState('');
    const [option, setOption] = useState(1);
    const [id, setId] = useState();
    const [header, setHeader] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/topic/getAll')
            .then((res) => {
                setTopics(res.data.response.rows);
            })
            .catch(() => navigate('/error'));
    }, [render, navigate]);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imgUpload);
        };
    }, [imgUpload]);
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    const handleChangeImg = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleShowUpdate = (topic) => {
        setImage();
        setId(topic.id);
        setHeader('Cập Nhật Chủ Đề');
        setOption(2);
        setShowBox(true);
        setImgUpload(`http://localhost:4000/src/${topic.image}`);
        setTitle(topic.title);
    };
    const handleShowDelete = (topic) => {
        setId(topic.id);
        setShowBoxDelete(true);
    };
    const handleTopic = (e) => {
        e.preventDefault();
        if (option === 1) {
            if (!title || !image) {
                setCheck('Cần gửi đầy đủ thông tin!');
            } else {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('image', image);
                axios
                    .post('http://localhost:4000/api/topic/addTopic', formData)
                    .then((res) => {
                        if (res.data.err === 0) {
                            setImgUpload();
                            setRender(!render);
                            setShowBox(false);
                            setShowMSG(true);
                            setTitle('');
                            setMsg('Thêm chủ đề thành công!');
                            setCheck('');
                        } else if (res.data.err === 2) {
                            setCheck('Chủ đề này đã tồn tại!');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        } else if (option === 2) {
            if (!title && !image) {
                setCheck('Cần gửi đầy đủ thông tin!');
            } else {
                if (title) {
                    axios
                        .patch(`http://localhost:4000/api/topic/updateTitle/${id}`, { title: title })
                        .then(() => {
                            setImgUpload();
                            setRender(!render);
                            setShowBox(false);
                            setShowMSG(true);
                            setMsg('Cập nhật chủ đề thành công!');
                            setCheck('');
                        })
                        .catch(() => navigate('/error'));
                }
                if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    axios
                        .patch(`http://localhost:4000/api/topic/updateImage/${id}`, formData)
                        .then(() => {
                            setImgUpload();
                            setRender(!render);
                            setShowBox(false);
                            setShowMSG(true);
                            setMsg('Cập nhật chủ đề thành công!');
                            setCheck('');
                        })
                        .catch(() => navigate('/error'));
                }
            }
        }
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/topic/${id}`)
            .then(() => {
                setRender(!render);
                setShowMSG(true);
                setMsg('Xóa chủ đề thành công!');
                setShowBoxDelete(false);
            })
            .catch(() => navigate('/error'));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin
                title={'Quản lý chủ đề'}
                icon={faList}
                add
                onClick={() => {
                    setShowBox(true);
                    setOption(1);
                    setHeader('Thêm Chủ Đề');
                }}
            />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên chủ đề</th>
                            <th>Ảnh minh họa</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic, index) => {
                            return (
                                <tr key={index}>
                                    <td>{topic.id}</td>
                                    <td>{topic.title}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${topic.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowUpdate(topic)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            Sửa
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-delete')}
                                            onClick={() => handleShowDelete(topic)}
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
                <form onSubmit={handleTopic}>
                    <Box
                        onclickCancle={() => {
                            setShowBox(false);
                            setImgUpload();
                            setCheck('');
                            setTitle('');
                        }}
                        type={'submit'}
                        check={check}
                        title={header}
                    >
                        <div className={cx('form-add')}>
                            <div className={cx('container')}>
                                <div className={cx('item')}>
                                    <p className={cx('text')}>Tên chủ đề:</p>
                                    <input
                                        className={cx('input')}
                                        type="text"
                                        name="title"
                                        onChange={handleChangeTitle}
                                        value={title}
                                    />
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('text')}>Ảnh minh họa:</p>
                                    <div className={cx('file')}>
                                        <input
                                            type="file"
                                            name="image"
                                            id="file"
                                            className={cx('inputfile')}
                                            onChange={handleChangeImg}
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
                            </div>
                        </div>
                    </Box>
                </form>
            )}
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBoxDelete && (
                <BoxDelete
                    msg={'Xác nhận xóa chủ đề này'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default AdminTopics;
