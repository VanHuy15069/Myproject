import classNames from 'classnames/bind';
import styles from './AdminSinger.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faStreetView, faPenToSquare, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '~/components/Box/Box';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
const cx = classNames.bind(styles);
function AdminSinger() {
    const navigate = useNavigate();
    const [singers, setSingers] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [option, setOption] = useState();
    const [title, setTitle] = useState('');
    const [showMSG, setShowMSG] = useState(false);
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [msg, setMsg] = useState('');
    const [image, setImage] = useState();
    const [uploadImage, setUploadImage] = useState();
    const [check, setCheck] = useState('');
    const [id, setId] = useState();
    const [render, setRender] = useState(false);
    const [data, setData] = useState({
        singerName: '',
        description: '',
    });
    const { singerName, description } = data;
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/singer/getAll')
            .then((res) => {
                setSingers(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, render]);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(uploadImage);
        };
    }, [uploadImage]);
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    const handleShowAdd = () => {
        setOption(1);
        setShowBox(true);
        setTitle('Thêm Ca Sĩ');
    };
    const handleCancle = () => {
        setShowBox(false);
        setData({
            singerName: '',
            description: '',
        });
        setUploadImage();
        setCheck('');
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleChangeIMG = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setUploadImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleShowUpdate = (singer) => {
        setId(singer.id);
        setData({
            singerName: singer.singerName,
            description: singer.description,
        });
        setShowBox(true);
        setOption(2);
        setUploadImage(`http://localhost:4000/src/${singer.image}`);
        setImage();
    };
    const handleShowDelete = (singer) => {
        setId(singer.id);
        setShowBoxDelete(true);
    };
    const handleSinger = () => {
        if (option === 1) {
            if (!data.singerName || !data.description || !image) setCheck('Cần gửi đầy đủ thông tin!');
            else {
                const formData = new FormData();
                formData.append('singerName', data.singerName);
                formData.append('description', data.description);
                formData.append('image', image);
                axios
                    .post('http://localhost:4000/api/singer/addSinger', formData)
                    .then(() => {
                        setCheck('');
                        setRender(!render);
                        setMsg('Thêm ca sĩ thành công');
                        setShowMSG(true);
                        setShowBox(false);
                        setData({
                            singerName: '',
                            description: '',
                        });
                        setUploadImage();
                    })
                    .catch(() => navigate('/error'));
            }
        }
        if (option === 2) {
            if (!data.singerName || !data.description) setCheck('Cần gửi đầy đủ thông tin!');
            else {
                if (data.singerName && data.description) {
                    axios
                        .put(`http://localhost:4000/api/singer/${id}`, data)
                        .then(() => {
                            setCheck('');
                            setMsg('Cập nhật ca sĩ thành công');
                            setShowMSG(true);
                            setRender(!render);
                            setShowBox(false);
                            setData({
                                singerName: '',
                                description: '',
                            });
                            setUploadImage();
                        })
                        .catch(() => navigate('/error'));
                }
                if (image) {
                    const formData = new FormData();

                    formData.append('image', image);
                    axios.patch(`http://localhost:4000/api/singer/${id}`, formData).catch(() => navigate('/error'));
                }
            }
        }
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/singer/${id}`)
            .then(() => {
                setCheck('');
                setMsg('Xóa ca sĩ thành công');
                setShowMSG(true);
                setRender(!render);
                setShowBoxDelete(false);
            })
            .catch(() => navigate('/error'));
    };
    return (
        <div className={cx('wraper')}>
            <TitleAdmin icon={faStreetView} title={'Quản lý ca sĩ'} add onClick={handleShowAdd} />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên ca sĩ</th>
                            <th>Mô tả</th>
                            <th className={cx('avata')}>Avata</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {singers.map((singer, index) => {
                            return (
                                <tr key={index}>
                                    <td>{singer.id}</td>
                                    <td>{singer.singerName}</td>
                                    <td className={cx('desc')}>{singer.description}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${singer.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td className={cx('control-col')}>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowUpdate(singer)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            Sửa
                                        </button>
                                    </td>
                                    <td className={cx('control-col')}>
                                        <button
                                            className={cx('btn', 'btn-delete')}
                                            onClick={() => handleShowDelete(singer)}
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
                <Box title={title} onclickCancle={handleCancle} onclickOK={handleSinger} check={check}>
                    <div className={cx('form-add')}>
                        <div className={cx('container')}>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Tên ca sĩ:</p>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    name="singerName"
                                    onChange={handleChange}
                                    value={singerName}
                                />
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Mô tả:</p>
                                <textarea
                                    className={cx('input', 'text-area')}
                                    rows={3}
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    value={description}
                                />
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Avata:</p>
                                <div className={cx('file')}>
                                    <input
                                        type="file"
                                        name="image"
                                        id="file"
                                        className={cx('inputfile')}
                                        onChange={handleChangeIMG}
                                    />
                                    <label htmlFor="file">
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <span>Chọn file</span>
                                    </label>
                                    <img className={cx('img-upload')} alt="" src={uploadImage} />
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
                    msg={'Xác nhận xóa ca sĩ này!'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default AdminSinger;
