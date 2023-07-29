import classNames from 'classnames/bind';
import styles from './AdminNation.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faLocationDot, faPenToSquare, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '~/components/Box/Box';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
const cx = classNames.bind(styles);
function AdminNation() {
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    const [nations, setNations] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [nationName, setNationName] = useState('');
    const [check, setCheck] = useState('');
    const [showBoxMSG, setShowBoxMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [option, setOption] = useState();
    const [id, setId] = useState();
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [imgUpload, setImgUpload] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getAll')
            .then((res) => {
                setNations(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, render]);
    useEffect(() => {
        let timer;
        if (showBoxMSG) {
            timer = setTimeout(() => {
                setShowBoxMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showBoxMSG]);
    useEffect(() => {
        return () => URL.revokeObjectURL(imgUpload);
    }, [imgUpload]);
    const handleCancle = () => {
        setShowBox(false);
        setCheck('');
        setNationName('');
        setImgUpload();
    };
    const handleChange = (e) => {
        setNationName(e.target.value);
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleShowUpdate = (nation) => {
        setOption(2);
        setShowBox(true);
        setId(nation.id);
        setImgUpload(`http://localhost:4000/src/${nation.image}`);
        setNationName(nation.nationName);
        setTitle('Cập Nhật Quốc Gia');
    };
    const handleShowDelete = (nation) => {
        setId(nation.id);
        setShowBoxDelete(true);
    };
    const handleNation = () => {
        if (option === 1) {
            if (!nationName || !image) {
                setCheck('Bạn cần gửi đầy đủ thông tin!');
            } else {
                const formData = new FormData();
                formData.append('nationName', nationName);
                formData.append('image', image);
                axios
                    .post('http://localhost:4000/api/nation/addNation', formData)
                    .then(() => {
                        setCheck('');
                        setMsg('Thêm quốc gia thành công');
                        setShowBox(false);
                        setNationName('');
                        setImage();
                        setImgUpload();
                        setShowBoxMSG(true);
                        setRender(!render);
                    })
                    .catch(() => navigate('/error'));
            }
        }
        if (option === 2) {
            if (!nationName) {
                setCheck('Bạn cần gửi đầy đủ thông tin!');
            } else {
                axios
                    .patch(`http://localhost:4000/api/nation/${id}`, { nationName: nationName })
                    .then(() => {
                        setCheck('');
                        setMsg('Cập nhật quốc gia thành công');
                        setNationName('');
                        setShowBoxMSG(true);
                        setShowBox(false);
                        setRender(!render);
                    })
                    .catch(() => navigate('/error'));
                if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    axios
                        .patch(`http://localhost:4000/api/nation/image/${id}`, formData)
                        .then(() => {
                            setImage();
                            setImgUpload();
                        })
                        .catch(() => navigate('/error'));
                }
            }
        }
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/nation/${id}`)
            .then(() => {
                setMsg('Xóa quốc gia thành công');
                setShowBoxMSG(true);
                setRender(!render);
                setShowBoxDelete(false);
            })
            .catch(() => navigate('/error'));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin
                icon={faLocationDot}
                title={'Quản lý quốc gia'}
                add
                onClick={() => {
                    setShowBox(true);
                    setOption(1);
                    setTitle('Thêm Quốc Gia');
                }}
            />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh quốc gia</th>
                            <th>Tên quốc gia</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nations.map((nation, index) => {
                            return (
                                <tr key={index}>
                                    <td>{nation.id}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${nation.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td>{nation.nationName}</td>
                                    <td className={cx('control-col')}>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowUpdate(nation)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            Sửa
                                        </button>
                                    </td>
                                    <td className={cx('control-col')} onClick={() => handleShowDelete(nation)}>
                                        <button className={cx('btn', 'btn-delete')}>
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
                <Box onclickCancle={handleCancle} onclickOK={handleNation} type={'submit'} check={check} title={title}>
                    <div className={cx('form-add')}>
                        <div className={cx('container')}>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Tên quốc gia:</p>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    name="nationName"
                                    onChange={handleChange}
                                    value={nationName}
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
                        </div>
                    </div>
                </Box>
            )}
            {showBoxDelete && (
                <BoxDelete
                    msg={'Xác nhận xóa quốc gia này'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
            {showBoxMSG && (
                <div className={cx('msg')} onClick={() => setShowBoxMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
        </div>
    );
}
export default AdminNation;
