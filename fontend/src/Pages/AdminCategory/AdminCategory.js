import classNames from 'classnames/bind';
import styles from './AdminCategory.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faIcons, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    const [title, setTitle] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [check, setCheck] = useState('');
    const [showMSG, setShowMSG] = useState(false);
    const [msg, setMsg] = useState('');
    const [render, setRender] = useState(false);
    const [id, setId] = useState();
    useEffect(() => {
        if (showMSG) {
            setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
    }, [showMSG]);
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
        setTitle('Thêm Danh Mục');
    };
    const handleCancle = () => {
        setShowBox(false);
        setCategoryName('');
        setCheck('');
    };
    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };
    const handleShowUpdate = (category) => {
        setId(category.id);
        setCategoryName(category.categoryName);
        setOption(2);
        setShowBox(true);
    };
    const handleShowDelete = (category) => {
        setId(category.id);
        setShowBoxDelete(true);
    };
    const handleCategory = () => {
        if (option === 1) {
            if (!categoryName) setCheck('Cần gửi đầy đủ thông tin');
            else {
                axios
                    .post('http://localhost:4000/api/category/addCategory', { categoryName: categoryName })
                    .then(() => {
                        setMsg('Thêm thể loại nhạc thành công');
                        setShowMSG(true);
                        setCheck('');
                        setCategoryName('');
                        setShowBox(false);
                        setRender(!render);
                    })
                    .catch(() => navigate('/error'));
            }
        }
        if (option === 2) {
            if (!categoryName) setCheck('Cần gửi đầy đủ thông tin');
            else {
                axios
                    .patch(`http://localhost:4000/api/category/${id}`, { categoryName: categoryName })
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
                            <th>Tên thể loại</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td>{category.id}</td>
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
                <Box title={title} onclickCancle={handleCancle} onclickOK={handleCategory} check={check}>
                    <div className={cx('content-box')}>
                        <p>Tên thể loại:</p>
                        <input
                            className={cx('input')}
                            type="text"
                            name="categoryName"
                            value={categoryName}
                            onChange={handleChange}
                        />
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
