import classNames from 'classnames/bind';
import styles from './AdminCategory.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faIcons, faPenToSquare, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '~/components/Box/Box';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
const cx = classNames.bind(styles);
function AdminCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [option, setOption] = useState();
    const [showBox, setShowBox] = useState(false);
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [header, setHeader] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [check, setCheck] = useState('');
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [render, setRender] = useState(false);
    const [id, setId] = useState();
    const [image, setImage] = useState();
    const [imgUpload, setImgUpload] = useState();
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
    useEffect(() => {
        return () => URL.revokeObjectURL(imgUpload);
    }, [imgUpload]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/category/getCategory')
            .then((res) => {
                setCategories(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, render]);
    const handleShowAdd = () => {
        setOption(1);
        setShowBox(true);
        setHeader('Thêm danh mục');
    };
    const handleCancle = () => {
        setShowBox(false);
        setCategoryName('');
        setCheck('');
        setImgUpload();
    };
    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0]) {
            setImgUpload(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleShowUpdate = (category) => {
        setId(category.id);
        setCategoryName(category.categoryName);
        setImgUpload(`http://localhost:4000/src/${category.image}`);
        setOption(2);
        setShowBox(true);
        setHeader('Cập nhật danh mục');
    };
    const handleShowDelete = (category) => {
        setId(category.id);
        setShowBoxDelete(true);
    };
    const handleCategory = () => {
        if (option === 1) {
            if (!categoryName || !image) setCheck('Cần gửi đầy đủ thông tin');
            else {
                const formData = new FormData();
                formData.append('categoryName', categoryName);
                formData.append('image', image);
                axios
                    .post('http://localhost:4000/api/category/addCategory', formData)
                    .then(() => {
                        setMsg('Thêm thể loại nhạc thành công');
                        setShowMSG(true);
                        setCheck('');
                        setCategoryName('');
                        setImgUpload();
                        setShowBox(false);
                        setRender(!render);
                    })
                    .catch(() => navigate('/error'));
            }
        }
        if (option === 2) {
            if (!categoryName) setCheck('Cần gửi đầy đủ thông tin');
            else {
                if (categories) {
                    axios
                        .patch(`http://localhost:4000/api/category/categoryName/${id}`, { categoryName: categoryName })
                        .then(() => {
                            setMsg('Cập nhật thể loại nhạc thành công');
                            setShowMSG(true);
                            setCheck('');
                            setCategoryName('');
                            setShowBox(false);
                            setRender(!render);
                        })
                        .catch(() => navigate('/error'));
                }
                if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    axios
                        .patch(`http://localhost:4000/api/category/image/${id}`, formData)
                        .then(() => {
                            setMsg('Cập nhật thể loại nhạc thành công');
                            setShowMSG(true);
                            setCheck('');
                            setCategoryName('');
                            setShowBox(false);
                            setRender(!render);
                        })
                        .catch(() => navigate('/error'));
                }
            }
        }
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/category/${id}`)
            .then(() => {
                setMsg('Xóa thể loại nhạc thành công');
                setShowMSG(true);
                setShowBoxDelete(false);
                setRender(!render);
            })
            .catch(() => navigate('/error'));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin icon={faIcons} title={'Quản lý thể loại'} add onClick={handleShowAdd} />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh minh họa</th>
                            <th>Tên thể loại</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td className={cx('img-col')}>
                                        <div className={cx('data-img')}>
                                            <img
                                                className={cx('img')}
                                                src={`http://localhost:4000/src/${category.image}`}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td>{category.categoryName}</td>
                                    <td className={cx('control-col')}>
                                        <button
                                            className={cx('btn', 'btn-update')}
                                            onClick={() => handleShowUpdate(category)}
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
                                            onClick={() => handleShowDelete(category)}
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
                <Box
                    onclickCancle={handleCancle}
                    onclickOK={handleCategory}
                    type={'submit'}
                    check={check}
                    title={header}
                >
                    <div className={cx('form-add')}>
                        <div className={cx('container')}>
                            <div className={cx('item')}>
                                <p className={cx('text')}>Tên thể loại:</p>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    name="categoryName"
                                    onChange={handleChange}
                                    value={categoryName}
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
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBoxDelete && (
                <BoxDelete
                    msg={'Xác nhận xóa thể loại này!'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default AdminCategory;
