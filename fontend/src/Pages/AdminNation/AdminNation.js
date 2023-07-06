import classNames from 'classnames/bind';
import styles from './AdminNation.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faLocationDot, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/nation/getAll')
            .then((res) => {
                setNations(res.data.response);
            })
            .catch(() => navigate('/error'));
    }, [navigate, render]);
    useEffect(() => {
        if (showBoxMSG) {
            setTimeout(() => {
                setShowBoxMSG(false);
            }, 3000);
        }
    }, [showBoxMSG]);
    const handleCancle = () => {
        setShowBox(false);
        setCheck('');
        setNationName('');
    };
    const handleChange = (e) => {
        setNationName(e.target.value);
    };
    const handleShowUpdate = (nation) => {
        setShowBox(true);
        setId(nation.id);
        setOption(2);
        setNationName(nation.nationName);
        setTitle('Cập Nhật Quốc Gia');
    };
    const handleShowDelete = (nation) => {
        setId(nation.id);
        setShowBoxDelete(true);
    };
    const handleNation = () => {
        if (option === 1) {
            if (!nationName) {
                setCheck('Bạn cần gửi đầy đủ thông tin!');
            } else {
                axios
                    .post('http://localhost:4000/api/nation/addNation', { nationName: nationName })
                    .then(() => {
                        setCheck('');
                        setMsg('Thêm quốc gia thành công');
                        setShowBox(false);
                        setNationName('');
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
                        setShowBoxMSG(true);
                        setShowBox(false);
                        setRender(!render);
                    })
                    .catch(() => navigate('/error'));
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
                            <th>Tên quốc gia</th>
                            <th colSpan={2}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nations.map((nation, index) => {
                            return (
                                <tr key={index}>
                                    <td>{nation.id}</td>
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
                <Box title={title} onclickCancle={handleCancle} type={'submit'} onclickOK={handleNation} check={check}>
                    <div className={cx('content-box')}>
                        <p>Tên quốc gia:</p>
                        <input
                            className={cx('input')}
                            type="text"
                            name="nationName"
                            value={nationName}
                            onChange={handleChange}
                        />
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
