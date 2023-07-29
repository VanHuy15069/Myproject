import { faImage, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import classNames from 'classnames/bind';
import styles from './AdminSlider.module.scss';
import { useState, useEffect } from 'react';
import BoxChooseFile from '~/components/BoxChooseFile/BoxChooseFile';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
const cx = classNames.bind(styles);
function AdminSlider() {
    const [showChooseFile, setShowChooseFile] = useState(false);
    const [imgUpload, setImgUpload] = useState();
    const [image, setImage] = useState();
    const [slider, setSlider] = useState([]);
    const [render, setRender] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [id, setId] = useState();
    const [check, setCheck] = useState('');
    const [option, setOption] = useState(1);
    const [msg, setMsg] = useState('');
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imgUpload);
        };
    }, [imgUpload]);
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/slider/getSlider')
            .then((res) => {
                setSlider(res.data.response);
            })
            .catch((err) => console.log(err));
    }, [render]);
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleSlide = (e) => {
        e.preventDefault();
        if (option === 1) {
            if (!imgUpload) setCheck('Cần nhập đầy đủ thông tin');
            else {
                const formData = new FormData();
                formData.append('image', image);
                axios
                    .post('http://localhost:4000/api/slider/addSlider', formData)
                    .then(() => {
                        setRender(!render);
                        setShowMSG(true);
                        setShowChooseFile(false);
                        setCheck('');
                        setMsg('Thêm thành công!');
                    })
                    .catch((err) => console.log(err));
            }
        } else if (option === 2) {
            if (!imgUpload) setCheck('Cần nhập đầy đủ thông tin');
            else {
                const formData = new FormData();
                formData.append('image', image);
                axios
                    .patch(`http://localhost:4000/api/slider/${id}`, formData)
                    .then(() => {
                        setRender(!render);
                        setShowMSG(true);
                        setShowChooseFile(false);
                        setCheck('');
                        setMsg('Cập nhật thành công!');
                    })
                    .catch((err) => console.log(err));
            }
        }
    };
    const handleShowBox = (slide) => {
        setOption(2);
        setId(slide.id);
        setImgUpload(`http://localhost:4000/src/${slide.image}`);
        setShowChooseFile(true);
    };
    const handleDeleteShowBox = (slide) => {
        setId(slide.id);
        setShowDeleteBox(true);
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/slider/${id}`)
            .then(() => {
                setRender(!render);
                setShowMSG(true);
                setShowDeleteBox(false);
                setMsg('Xóa thành công!');
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin
                icon={faImage}
                title={'Quản lý silder'}
                add
                onClick={() => {
                    setShowChooseFile(true);
                    setOption(1);
                }}
            />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Slider</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slider.map((slide, index) => {
                            return (
                                <tr key={index}>
                                    <td>{slide.id}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${slide.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowBox(slide)}
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
                                            onClick={() => handleDeleteShowBox(slide)}
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
            {showChooseFile && (
                <BoxChooseFile
                    check={check}
                    onclickCancle={() => {
                        setShowChooseFile(false);
                        setImgUpload();
                        setCheck('');
                    }}
                    onChange={handleChangeImage}
                    image={imgUpload}
                    onclickOK={handleSlide}
                />
            )}
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showDeleteBox && (
                <BoxDelete
                    msg={'Xác nhận xóa slide này!'}
                    onClickCancle={() => setShowDeleteBox(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default AdminSlider;
